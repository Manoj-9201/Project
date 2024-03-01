import React, { Component, useState } from 'react'
import { Link } from 'react-router-dom'
import props from 'prop-types';

import "../pages/login.css";


export default class Signup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // orgname: "",
            email: "",
            password: "",
            confirm_password: "",
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const { email, password, confirm_password } = this.state;
        console.log(email, password, confirm_password);
        fetch("http://localhost:5000/register", {
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
                confirm_password
            })
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data, "userRegister");
                if (data.status == "ok") {
                    alert("Account created");
                    window.localStorage.setItem("token", data.data)
                    window.location.href = "/"
                }
            });
    }

    render() {
        return (
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <form onSubmit={this.handleSubmit}>

                        <h3>Signup</h3>



                        <div className="mb-3">
                            <label>Email</label>
                            <input
                                className="form-control"
                                placeholder="Enter Email ID"
                                type="email"
                                onChange={(e) => this.setState({ email: e.target.value })}

                            />
                        </div>

                        <div className="mb-3">
                            <label>Password</label>
                            <input
                                className="form-control"
                                placeholder="Create a password"
                                type="password"
                                onChange={(e) => this.setState({ password: e.target.value })}

                            />
                        </div>

                        <div className="mb-3">
                            <label>Confirm password</label>
                            <input
                                className="form-control"
                                placeholder="Confirm password"
                                type='password'
                                onChange={(e) => this.setState({ confirm_password: e.target.value })}
                            />
                        </div>

                        {/* <div className="mb-3">
                            <label>Confirm Password</label>
                            <input
                                className="form-control"
                                placeholder="Confirm Password"
                                type='password'
                                onChange={(e) => this.setState({ confirm_password: e.target.value })}
                            />
                        </div> */}

                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary">
                                Create Account
                            </button>

                            <Link to="/">Already have an account? Login  </Link>
                        </div>

                    </form>
                </div>
            </div>
        )
    }


}

