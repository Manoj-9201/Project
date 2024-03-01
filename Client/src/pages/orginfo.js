import { React, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'
import './login.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'

export default function Orginfo() {


  const [org_name, setorg_name] = useState("");
  const [risk_framework, setrisk_framework] = useState("");

  const addOrg_Info = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/orginfo", {

        org_name, risk_framework
      })
      .then(() => {

        localStorage.setItem('org_info', JSON.stringify({
          org_name,
          risk_framework,


        }))
        setorg_name("");
        setrisk_framework("");
        window.location.href = '/productinfo'

      })
      .catch((error) => alert(error.message));
  };



  return (
    <div style={{ paddingTop: "5rem" }}>
      <div className="auth-wrapper">
        <div className="auth-inner" style={{ marginTop: "90px" }}>

          <form onSubmit={addOrg_Info}>
            <h3>Tell about your Organization</h3>

            <div className="mb-3">
              <label>Name of your Organization</label>
              <input
                className="form-control"
                onChange={(e) => setorg_name(e.target.value)}
              />
            </div>



            {/* <label className='mb-3' style={{ marginTop: '20px', marginLeft: "90px" }}>

              Profile&nbsp;&nbsp;&nbsp;&nbsp;

              <select style={{ width: '200px', marginLeft: '95px' }}>

                <option value=" "></option>

                <option value="webApplication">Web Application</option>

                <option value="mobileApplication">Mobile Application</option>

                <option value="CIS">IOT</option>

              </select>

            </label> */}

            <div className='mb-3' style={{ marginTop: '20px' }}>

              <label className='mb-3' style={{ width: "100%   " }}>

                Select Organization Risk Framework&nbsp;&nbsp;&nbsp;&nbsp;

                <select style={{ width: '100%' }} className="form-select" onChange={(e) => setrisk_framework(e.target.value)}>

                  <option value="--Select--">--Select--</option>
                  <option value="NIST">NIST</option>
                  <option value="ISO">ISO</option>
                  <option value="CIS">CIS</option>

                </select>

              </label>
            </div>




            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>

            </div>

          </form>


        </div>
      </div>
    </div>
  )
}

