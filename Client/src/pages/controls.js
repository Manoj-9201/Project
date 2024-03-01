import React, { useState, useEffect } from "react";
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
import { MainListItems, SecondaryListItems } from "../dashboard/sidenav";
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
import { useParams } from 'react-router-dom'
import Checkbox from '@mui/material/Checkbox';
import Chatbot from "../pages/Chatbot";




const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

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




function ControlsContent(props) {
    const { categoryPercentages, handleCategoryClick } = props;
    const { control } = useParams()
    const [rows, setRows] = useState([])
    const [category, setCategory] = useState([])
    const [isAllChecked, setIsAllChecked] = useState(false);
    const [checkedCount, setCheckedCount] = useState(0);
    const [totalCheckboxes, setTotalCheckboxes] = useState(0);
    const [percentage, setPercentage] = useState(0);



    // console.log(values[0]['Requirement_Description']);

    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };
    const handleCheckboxChange = (index) => {
        const updatedRows = [...rows];
        updatedRows[index].Implemented = !updatedRows[index].Implemented;
        setRows(updatedRows);

        const allChecked = updatedRows.every((row) => row.Implemented);
        setIsAllChecked(allChecked);
        localStorage.setItem('rows', JSON.stringify(updatedRows));

        const count = updatedRows.filter((row) => row.Implemented).length;
        const total = updatedRows.length;
        const calculatedPercentage = (count / total) * 100;
        console.log(calculatedPercentage);
        localStorage.setItem("architecture", calculatedPercentage)
        localStorage.setItem("authentication", calculatedPercentage)
        localStorage.setItem("sessionManagement", calculatedPercentage)
        localStorage.setItem("accessControl", calculatedPercentage)
        localStorage.setItem("inputValidation", calculatedPercentage)
        localStorage.setItem("cryptography", calculatedPercentage)
        localStorage.setItem("errorHandling", calculatedPercentage)
        localStorage.setItem("dataProtection", calculatedPercentage)
        localStorage.setItem("communication", calculatedPercentage)
        localStorage.setItem("malicousCode", calculatedPercentage)
        localStorage.setItem("businessLogic", calculatedPercentage)
        localStorage.setItem("files", calculatedPercentage)
        localStorage.setItem("webServices", calculatedPercentage)
        localStorage.setItem("configuration", calculatedPercentage)


        setCheckedCount(count);
        setTotalCheckboxes(total);
        setPercentage(calculatedPercentage);
        handleCategoryClick(control, calculatedPercentage);
    };





    const typographyStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // height: '100vh', // Adjust this to your desired height
    };


    function createData(ID, ASVS_ID, Sub_Category, Requirement_description, Implemented,) {
        return { ID, ASVS_ID, Sub_Category, Requirement_description, Implemented, };
    }

    const controlsdisplay = () => { }

    useEffect(() => {



        const values = JSON.parse(localStorage.getItem('filter'))[control];
        console.log(values);
        values.sort((x, y) => (x.ID - y.ID))
        const rows = [];

        for (let i = 0; i < values.length; i++) {

            const data = [
                createData(values[i]['ID'], values[i]['ASVS_ID'], values[i]['Sub_Category'], values[i]['Requirement_Description'], <Checkbox {...label} />),

                {/* <Checkbox {...label} /> */ }
            ];
            rows.push(data);

        }
        console.log(rows);
        setRows(rows)

    }, [])


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
                                Controls
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


                        </div>
                        <TableContainer component={Paper} sx={{ boxShadow: "none" }}>

                            <Typography
                                sx={{


                                    fontSize: "1.25rem",
                                    marginBottom: "1rem",
                                    marginTop: "8rem",
                                    marginLeft: "5rem",

                                }}
                            > Note : This page is Integrated with a conversational AI.You can use it to know about every web vulnerabilities and also how to mitigate those vulnerabilities
                            </Typography>
                            <Table sx={{ maxWidth: 1500, marginLeft: "5rem", marginTop: "1rem", marginRight: "8rem" }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell align="center">ID</StyledTableCell>
                                        <StyledTableCell align="center">ASVS ID</StyledTableCell>
                                        <StyledTableCell>Sub Category </StyledTableCell>
                                        <StyledTableCell align="center">Requirement Description</StyledTableCell>
                                        <StyledTableCell align="center">Implemented</StyledTableCell>

                                        {/* <StyledTableCell align="left">Carbs&nbsp;(g)</StyledTableCell> */}

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row, index) => (
                                        <StyledTableRow key={index}>
                                            <StyledTableCell align="left">{row[0].ID}</StyledTableCell>
                                            <StyledTableCell align="left">{row[0].ASVS_ID}</StyledTableCell>
                                            <StyledTableCell component="th" scope="row">
                                                {row[0].Sub_Category}
                                            </StyledTableCell>
                                            <StyledTableCell align="left">{row[0].Requirement_description}</StyledTableCell>
                                            {/* <StyledTableCell align="left">{row[0].Implemented}</StyledTableCell> */}
                                            <StyledTableCell align="left">
                                                <Checkbox
                                                    {...label}
                                                    checked={row.Implemented}
                                                    onChange={() => handleCheckboxChange(index)}
                                                />
                                            </StyledTableCell>

                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                    <Chatbot />
                </Box>
            </ThemeProvider>
        </div >
    );
}

export default function Controls() {
    return <ControlsContent />;
}


