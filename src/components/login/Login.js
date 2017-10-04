import React, { Component } from 'react';
import FormLogin from './FormLogin';
import Settings from './../../settings/Settings';
import './../../css/login/Login.css';


class Login extends Component {
  
    render() {
        return (
            <section className="login-page">
                <div className="form">
                    <h1>{ Settings.NAME_SYSTEM }</h1>
                    <FormLogin />
                </div>
            </section>
        );
    }

}

export default Login;
