import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { MainListItems, SecondaryListItems } from "./sidenav";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import Tooltip from "@mui/material/Tooltip";
import { Chart } from "primereact/chart";
import { Link as LINK } from "react-router-dom";
import handleCheckboxChange from "../pages/controls";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#1976d2",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
console.log(handleCheckboxChange.calculatedPercentage);
function createData(
  Security_Category,
  Total_Criteria,
  Applicable_Criteria,
  Completed_Percentage,
  Generate_Requirements
) {
  return {
    Security_Category,
    Total_Criteria,
    Applicable_Criteria,
    Completed_Percentage,
    Generate_Requirements,
    isCompleted: false,
  };
}

const query_category_by_type = async () => {
  try {
    const query_data = {
      Architecture: [""],
      Authentication: [""],
      "Session Management": [""],
      "Access Control": [""],
      "Input Validation": ["Sanitization and Sandboxing"],
      "Cryptography at Rest": [""],
      "Error Handling and Logging": [""],
      "Data Protection": [""],
      "Communication Security": [""],
      "Malicious Code": [""],
      "Business Logic": [""],
      "Files and Resources": ["Upload", "Download", "Execution", "Storage"],
      "Web Services": ["REST", "SOAP"],
      Configuration: [""],
    };

    const local_item = JSON.parse(localStorage.getItem("product_info"));
    if (local_item.HTTP_used.length)
      query_data["Web Services"] = local_item.HTTP_used;

    if (local_item?.files?.length)
      query_data["Files and Resources"] = local_item.files;

    if (local_item?.mech_used?.length)
      query_data["Input Validation"] = [local_item.mech_used];

    if (local_item?.system && local_item?.data_used) {
      query_data.system = local_item?.system;
      query_data.data_used = local_item?.data_used;
    }

    const fetched = await fetch(
      "http://localhost:5000/query_category_by_type",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query_data }),
      }
    );

    const response = await fetched.json();

    if (response.success === false) {
      alert(response.msg);
    }
    const { data, level } = response;

    localStorage.setItem("rows", JSON.stringify(data));
    // {
    //    'Webservice': {included: [], excluded: []},
    //    'Architecture': {included: [], excluded: []}
    //  }

    const rows = [];
    const filtered_data = {};
    const total = { total_criteria: 0, applicable_criteria: 0 };
    for (let [key, value] of Object.entries(data)) {
      const { included, excluded } = value;
      const filtered = [];
      if (level !== 0) {
        for (let i = 0; i < included.length; i++) {
          const asvs_level = included[i]["ASVS_level"];

          if (asvs_level <= level) {
            filtered.push(included[i]);
          }
        }
      }
      filtered_data[key] = filtered;
      total.total_criteria += included.length + excluded.length;
      total.applicable_criteria += filtered.length;

      const cd = createData(
        key,
        included.length + excluded.length,
        <LINK to={"/controls/" + key}>{filtered.length}</LINK>,
        0
        // <Stack spacing={2} direction="row">
        //   <Button variant="contained" sx={{ margin: "auto" }}>
        //     Generate
        //   </Button>
        // </Stack>
      );
      // if (completedRows.includes(cd)) {
      //   cd.isCompleted = true;
      // }

      rows.push(cd);
    }

    localStorage.setItem("filter", JSON.stringify(filtered_data));
    return { rows, level, total };
  } catch (e) {
    console.log(e);
  }

  return [];
};

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();

const handleLogout = () => {
  window.location.href = "/";
};

function DashboardContent() {
  const org = JSON.parse(localStorage.getItem("org_info"));
  const item = JSON.parse(localStorage.getItem("product_info"));
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState({
    total_criteria: 0,
    applicable_criteria: 0,
  });
  const [level, setLevel] = useState(0);

  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    query_category_by_type().then(({ rows, level, total }) => {
      setRows(rows);
      setLevel(level);
      setTotal(total);
    });
  }, []);

  const typographyStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // height: '100vh', // Adjust this to your desired height
  };
  const sessionManagement = localStorage.getItem("architecture");
  const architecture = localStorage.getItem("authentication");
  const authentication = localStorage.getItem("sessionManagement");
  const accessControl = localStorage.getItem("accessControl");
  const inputValidation = localStorage.getItem("inputValidation");
  const cryptography = localStorage.getItem("cryptography");
  const errorhandling = localStorage.getItem("errorHandling");
  const dataProtection = localStorage.getItem("dataProtection");
  const communication = localStorage.getItem("communication");
  const maliciousCode = localStorage.getItem("maliciousCode");
  const businessLogic = localStorage.getItem("businessLogic");
  const files = localStorage.getItem("files");
  const webServices = localStorage.getItem("webServices");
  const configuration = localStorage.getItem("configuration");

  const [chartData] = useState({
    labels: [
      "Architecture",
      "Authentication",
      "Session Management",
      "Access Control",
      "Input Validation",
      "Cryptography at Rest",
      "Error Handling and Logging",
      "Data Protection",
      "Communication Security",
      "Malicious Code",
      "Business Logic",
      "Files and Resources",
      "Web Services",
      "Configuration",
    ],
    datasets: [
      {
        label: "Data",
        backgroundColor: "rgba(179,181,198,0.2)",
        borderColor: "rgba(179,181,198,1)",
        pointBackgroundColor: "rgba(179,181,198,1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(179,181,198,1)",
        data: [
          architecture,
          authentication,
          sessionManagement,
          accessControl,
          inputValidation,
          cryptography,
          errorhandling,
          dataProtection,
          communication,
          maliciousCode,
          businessLogic,
          files,
          webServices,
          configuration,
        ],
      },
    ],
  });

  const [lightOptions] = useState({
    plugins: {
      legend: {
        labels: {
          color: "#495057",
        },
      },
    },
    scales: {
      r: {
        pointLabels: {
          color: "#495057",
        },
        grid: {
          color: "#5A5A5A",
        },
        angleLines: {
          color: "#5A5A5A",
        },
      },
    },
  });

  return (
    <div>
      <ThemeProvider theme={mdTheme} id="pagetodownload">
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar position="absolute" open={open}>
            <Toolbar
              sx={{
                pr: "24px", // keep right padding when drawer closed
              }}
            >
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                sx={{
                  marginRight: "36px",
                  ...(open && { display: "none" }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                Dashboard
              </Typography>
              <Tooltip title="Profile" placement="top">
                <IconButton color="inherit" style={{ marginRight: "16px" }}>
                  <AccountCircleIcon style={{ fontSize: "30px" }} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Logout" placement="top">
                <IconButton color="inherit" onClick={handleLogout}>
                  <LogoutIcon style={{ fontSize: "30px" }} />
                </IconButton>
              </Tooltip>
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open}>
            <Toolbar
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                px: [1],
              }}
            >
              <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
            <Divider />
            <List component="nav">
              <MainListItems />
              <Divider sx={{ margin: "1rem" }} />
              {/* <SecondaryListItems /> */}
            </List>
          </Drawer>
          <Box
            component="main"
            sx={{
              // backgroundColor: (theme) =>
              //   theme.palette.mode === "light"
              //     ? theme.palette.grey[100]
              //     : theme.palette.grey[900],
              flexGrow: 1,
              height: "100vh",
              overflow: "auto",
            }}
          >
            <Toolbar />

            <div>
              <br></br>
              <br></br>
              <br></br>

              <div style={typographyStyle}>
                <Typography
                  sx={{
                    fontFamily: "Verdana (sans-serif)",
                    textAlign: "center",
                    fontSize: "60px",
                  }}
                >
                  Product Details
                </Typography>
              </div>
              <Card
                sx={{
                  maxWidth: "88%",
                  marginTop: "10rem",
                  marginBottom: "3rem",
                  padding: "1rem",
                  marginLeft: "5rem",
                  // height: "15vw",
                  // boxShadow: "0 0 25px #ccc",
                  boxShadow: "none",
                  borderRadius: "10px",
                  display: "grid",
                  gridTemplateColumns: "2fr 1fr 1fr",
                }}
              >
                <div style={{ display: "grid" }}>
                  <div style={{ display: "flex" }}>
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        "& > :not(style)": {
                          marginTop: 1,
                          marginLeft: "1px",
                          width: 728,
                          height: 300,
                          boxShadow: "0px 10px 10px #ccc",
                          borderRadius: "10px !important",
                        },
                      }}
                    >
                      {/* <Paper /> */}
                      <Paper elevation={2} sx={{ borderRadius: "10px" }}>
                        <Typography
                          sx={{
                            padding: "1rem",
                            fontFamily: "Roboto,Helvetica,Arial,sans-serif",
                            fontSize: "1.25rem",
                            borderRadius: "10px 10px 0 0",
                            fontWeight: "400",
                            marginBottom: "10px",
                          }}
                        >
                          Product Name : &nbsp;&nbsp; {item.name}
                        </Typography>

                        <div>
                          <Typography
                            sx={{
                              padding: "1rem",
                              fontFamily: "Roboto,Helvetica,Arial,sans-serif",
                              fontSize: "1.25rem",
                              borderRadius: "10px 10px 0 0",
                              fontWeight: "400",
                              marginBottom: "10px",
                            }}
                          >
                            Type : &nbsp;&nbsp; Mobile Application
                          </Typography>
                        </div>
                        <div>
                          <Typography
                            sx={{
                              padding: "1rem",
                              fontFamily: "Roboto,Helvetica,Arial,sans-serif",
                              fontSize: "1.25rem",
                              borderRadius: "10px 10px 0 0",
                              fontWeight: "400",
                              marginBottom: "10px",
                            }}
                          >
                            Description : &nbsp;&nbsp; {item.description}
                          </Typography>
                        </div>
                      </Paper>
                    </Box>
                  </div>
                </div>

                <Box
                  sx={{
                    width: 300,
                    marginLeft: "4rem",
                    height: "100%",
                    // boxShadow: "0px 10px 10px #ccc",
                    // borderRadius: "10px !important",
                  }}
                >
                  <Paper
                    elevation={2}
                    sx={{
                      height: "92%",
                      textAlign: "center",
                      boxShadow: "0px 10px 10px #ccc",
                      borderRadius: "10px !important",
                    }}
                  >
                    <Typography
                      sx={{
                        textAlign: "center",
                        marginTop: "13px",
                        fontFamily: "Roboto,Helvetica,Arial,sans-serif",
                        fontSize: "1.25rem",
                        backgroundColor: "#1976d2",
                        color: "#fff",
                        borderRadius: "10px 10px 0 0",
                        padding: ".5rem 0",
                      }}
                    >
                      Profile
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "80px",
                        // marginLeft: "5rem",
                        marginTop: "2rem",
                      }}
                    >
                      {org.risk_framework}
                      {/* {item.Product_type} */}
                    </Typography>
                  </Paper>
                </Box>

                <Box
                  sx={{ marginRight: "1px", marginLeft: "3rem", width: 300 }}
                >
                  <Paper
                    elevation={2}
                    sx={{
                      height: "92%",
                      textAlign: "center",
                      boxShadow: "0px 10px 10px #ccc",
                      borderRadius: "10px !important",
                    }}
                  >
                    <Typography
                      sx={{
                        textAlign: "center",
                        color: "#fff",
                        marginTop: "13px",
                        fontFamily: "Roboto,Helvetica,Arial,sans-serif",
                        fontSize: "1.25rem",
                        backgroundColor: "#1976d2",
                        color: "#fff",
                        borderRadius: "10px 10px 0 0",
                        padding: ".5rem 0",
                      }}
                    >
                      Maturity Level
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "90px",
                        // marginLeft: "5rem",
                        marginTop: "2rem",
                      }}
                    >
                      {/* {item.Product_type} */}
                      {level}
                    </Typography>
                  </Paper>
                </Box>
              </Card>
            </div>
            <Typography
              sx={{
                marginTop: "5rem",
                marginLeft: "6rem",
                marginBottom: "3rem",
                fontSize: "1.25rem",
              }}
            >
              Based on your product's characteristics and maturity model, the
              table narrows down the controls that are appropriate to your
              product and are displayed in the applicable criteria column.
            </Typography>
            <Typography
              sx={{
                marginTop: "2rem",
                marginLeft: "6rem",
                marginBottom: "3rem",
                fontSize: "1.25rem",
              }}
            >
              Click on the applicable criteria to generate the controls of
              corresponding security category
            </Typography>
            <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
              <Table
                sx={{ maxWidth: 1500, margin: "auto", marginLeft: "6rem" }}
                aria-label="customized table"
              >
                <TableHead>
                  <TableRow sx={{ backgroundColor: "blue" }}>
                    <StyledTableCell>Security Category</StyledTableCell>
                    <StyledTableCell align="center">
                      Total Criteria
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      Applicable Criteria
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      Completed Percentage
                    </StyledTableCell>
                    {/* <StyledTableCell align="center">
                      Generate Requirements
                    </StyledTableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <StyledTableRow key={row.Security_Category}>
                      <StyledTableCell component="th" scope="row">
                        {row.Security_Category}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.Total_Criteria}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.Applicable_Criteria}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.Completed_Percentage}
                      </StyledTableCell>
                      {/* <StyledTableCell align="center">
                        {row.Generate_Requirements}
                      </StyledTableCell> */}
                    </StyledTableRow>
                  ))}
                  <StyledTableRow>
                    <StyledTableCell component="th" scope="row">
                      Total
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {total.total_criteria}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {total.applicable_criteria}
                    </StyledTableCell>
                    <StyledTableCell align="center"></StyledTableCell>
                  </StyledTableRow>
                </TableBody>
              </Table>
              <div className="card flex justify-content-center">
                <Typography
                  sx={{
                    textAlign: "center",
                    marginTop: "5rem",
                    marginBottom: "3rem",
                    fontSize: "2rem",
                  }}
                >
                  Maturity Model
                </Typography>
                <Chart
                  type="radar"
                  data={chartData}
                  options={lightOptions}
                  style={{
                    margin: "auto",
                    width: "50%",
                    outline: "none",
                  }}
                />
              </div>
            </TableContainer>
          </Box>
        </Box>
      </ThemeProvider>
    </div>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
