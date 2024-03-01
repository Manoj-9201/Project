import axios from 'axios';
import './login.css'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { Component, useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';




function AddInfo() {
  const [name, setname] = useState("");
  const [Product_type, setProduct_type] = useState("");
  const [HTTP_used, setHTTP_used] = useState("");
  const [description, setdescription] = useState("");
  const [mech_used, setmech_used] = useState("");
  const [files, setfiles] = useState("");
  const [system, setsystem] = useState("");
  const [data_used, setdata_used] = useState("");


  // const handleSubmit = (event) => {
  //   console.log('Submitted !')
  //   window.location.href='/dashboard'
  // }



  const onTagsChange = (event, values) => {
    setHTTP_used(values)
  }

  const onmechchange = (event) => {
    setmech_used(event.target.value)
  }
  const onSystyemChange = (event) => {
    setsystem(event.target.value)
  }
  const onfilechange = (event, values) => {
    setfiles(values)
  }
  const onDatachange = (event, values) => {
    setdata_used(values)
  }


  const addInfo = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/productinfo", {
        name, Product_type,
        HTTP_used, description, mech_used, files, system, data_used
      })
      .then(() => {
        localStorage.setItem('product_info', JSON.stringify({
          name,
          Product_type,
          HTTP_used,
          description,
          mech_used,
          files,
          system,
          data_used,


        }))
        setname("");
        setProduct_type("");
        setHTTP_used("");
        setdescription("");
        setmech_used("");
        setfiles("");
        setsystem("");
        setdata_used("");
        window.location.href = '/Dashboard'


      })
      .catch((error) => alert(error.message));
    // window.location.href = '/dashboard'
  };






  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;


  const auth_select = [
    { auth: 'SSO' },
    { auth: 'MFA' },
    { auth: 'OAuth2' },
    { auth: 'Basic' },
    { auth: 'Others' },

  ];
  const http_select = [
    "REST", "SOAP", "GRAPHQL"

  ];

  const files_res = [
    "Storage", 'Execution', 'Upload', 'Download'
  ]
  const data = [
    "Phone number, Age, Home address, gender, email, Internet Facing Websites (e.g., company website, social networks, blogs etc.)",
    'Birth date, Educational data, Financial data, System Config settings, Internal IP address, legal billings, Corporate tax, Paychecks, Bank account information',
    'Financial Account number, Payment Card number, Medical data, Cryptographic keys, Driver License'
  ]


  return (
    <div style={{ margin: '5rem', }}>


      <div className="auth-wrapper">
        <div className="auth-inner">
          <form onSubmit={addInfo}>
            <h3>Product Details</h3>

            <div className="mb-3">
              <label>Name of the Product</label>
              <input
                className="form-control"
                onChange={(e) => setname(e.target.value)}
              />
            </div>


            <div className='mb-3' style={{ marginTop: '20px' }}>

              <label className='mb-3' style={{ width: "100%   " }}>

                Product Type&nbsp;&nbsp;&nbsp;&nbsp;

                <select style={{ width: '100%' }} className="form-select" onChange={(e) => setProduct_type(e.target.value)}>

                  <option value="--Select--">--Select--</option>
                  <option value="Web Application">Web Application</option>
                  <option value="Mobile Application">Mobile Application</option>
                  <option value="IOT">IOT</option>

                </select>

              </label>
            </div>


            <div className='mb-3' style={{ marginTop: '20px' }}>
              <label className='mb-3' style={{ width: "100%" }}>
                Type of HTTP methods used
                <Autocomplete
                  multiple
                  id="checkboxes"
                  options={http_select}
                  disableCloseOnSelect
                  getOptionLabel={(option) => option}
                  onChange={onTagsChange}
                  getOptionSelected={(option, value) => option === value}
                  renderOption={(props, option, { selected }) => (
                    <li {...props} >
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}

                      />
                      {option}
                    </li>
                  )}
                  style={{ width: "100%" }}
                  renderInput={(params) => (
                    <TextField {...params} placeholder="HTTP methods used" onChange={onTagsChange} />
                  )}
                />
              </label>
            </div>


            <div className='mb-3' style={{ marginTop: '20px' }}>
              <label className='mb-3' style={{ width: "100%" }}>
                What are the file-related features available in the product?
                <Autocomplete
                  multiple
                  id="checkboxes"
                  options={files_res}
                  disableCloseOnSelect
                  getOptionLabel={(option) => option}
                  onChange={onfilechange}
                  getOptionSelected={(option, value) => option === value}
                  renderOption={(props, option, { selected }) => (
                    <li {...props} >
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}

                      />
                      {option}
                    </li>
                  )}
                  style={{ width: "100%" }}
                  renderInput={(params) => (
                    <TextField {...params} placeholder="features" onChange={onfilechange} />
                  )}
                />
              </label>
            </div>


            <div className='mb-3' style={{ marginTop: '20px' }}>

              <label className='mb-3' style={{ width: "100%" }}>

                How long can a system and server outage be tolerated?&nbsp;&nbsp;&nbsp;&nbsp;

                <select style={{ width: "100%" }} onChange={onSystyemChange} className="form-select">

                  <option value="--Select--">--Select--</option>
                  <option value="Cannot be tolerated">Cannot be tolerated</option>
                  <option value="Can go down for upto 24hrs">Can go down for upto 24hrs</option>
                  <option value="Can go down for upto 72hrs">Can go down for upto 72hrs</option>


                </select>

              </label>
            </div>

            <div className='mb-3' style={{ marginTop: '20px' }}>
              <label className='mb-3' style={{ width: "100%" }}>
                What are the different kinds of data that are used in your product ?
                <Autocomplete
                  multiple
                  id="checkboxes"
                  options={data}
                  disableCloseOnSelect
                  getOptionLabel={(option) => option}
                  onChange={onDatachange}
                  getOptionSelected={(option, value) => option === value}
                  renderOption={(props, option, { selected }) => (
                    <li {...props} >
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}

                      />
                      {option}
                    </li>
                  )}
                  style={{ width: "100%" }}
                  renderInput={(params) => (
                    <TextField {...params} placeholder="data used" onChange={onDatachange} />
                  )}
                />
              </label>
            </div>

            <div className='mb-3' style={{ marginTop: '20px' }}>

              <label className='mb-3' style={{ width: "100%" }}>

                Does the product uses any below mentioned mechanism for handling user input?&nbsp;&nbsp;&nbsp;&nbsp;

                <select style={{ width: "100%" }} onChange={onmechchange} className="form-select">

                  <option value="--Select--">--Select--</option>
                  <option value="Sanitization and Sandboxing">Sanitization and Sandboxing</option>
                  <option value="None">None</option>

                </select>

              </label>
            </div>

            <div className="mb-3">
              <label title='Such as personal information, financial information, or health information etc...'>
                What types of data will the product handle?</label>
              <input
                className="form-control"
              />
            </div>

            <label style={{ textAlign: 'center' }}>Detailed Description of the Product</label>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>



              <div className="mb-3">
                <textarea placeholder='Description..' style={{ width: '640px', height: '100px' }}
                  onChange={(e) => setdescription(e.target.value)} />
              </div>
            </div>

            <div className="d-grid">
              <button className="btn btn-primary" >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

  );
}

export default AddInfo;