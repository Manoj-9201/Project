import React, { Component } from 'react'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom'
import '../pages/login.css';


export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { email, password, } = this.state;
    console.log(email, password,);

    if (!email || !password) {
      alert('Please enter both email and password.');
      return;
    }

    fetch("http://localhost:5000/login-user", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
        password,
      })
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        if (data.status == "ok") {
          alert("login Successful");
          window.localStorage.setItem("token", data.data)
          window.location.href = "/orginfo"
        } else {
          alert('Invalid email or password');
        }
      });

  }
  render() {
    return (
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form onSubmit={this.handleSubmit}>
            <h3>Login</h3>

            <div className="mb-3">
              <label>Email</label>
              <input
                className="form-control"
                placeholder="Enter Email ID"
                type='email'
                onChange={(e) => this.setState({ email: e.target.value })}
              />
            </div>

            <div className="mb-3">
              <label>Password</label>
              <input
                className="form-control"
                placeholder="Enter password"
                type='password'
                onChange={(e) => this.setState({ password: e.target.value })}
              />
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-primary" >
                Login
              </button>

              <Link to="/signup">New User? Create Account </Link>
            </div>
            <p className="forgot-password text-right">
              Forgot <a href="#">password?</a>
            </p>
          </form>
        </div>
      </div>
    )
  }
}
