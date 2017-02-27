import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setEmail, setPassword, login, logout } from '../../actions/login';
import './styles/loginscreen.css';

class Login extends Component {
    
    constructor() {
        super();
        this.setEmail = this.setEmail.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.loginWithEmail = this.loginWithEmail.bind(this);
        this.loginWithFacebook = this.loginWithFacebook.bind(this);
        this.logout = this.logout.bind(this);
    }

    setEmail(event) {
        this.props.setEmail(event.target.value);
    }

    setPassword(event) {
        this.props.setPassword(event.target.value);
    }

    loginWithEmail() {
        this.props.login('email', this.props.email, this.props.password);
    }

    loginWithFacebook() {
        this.props.login('facebook');
    }

    logout() {
        this.props.logout();
    }

    render() {
        // If user is logged in
        if(this.props.user && !this.props.user.isAnonymous) {
            return (
                <div className="login-screen">
                    <form>
                        <button className="login-screen__button red" type="button" onClick={this.logout}><i className="material-icons">person</i><span>Logout</span></button>
                    </form>
                </div>
            )
        }
        else {
            return (
                <div className="login-screen">
                    <div className="login-screen__content">
                        <button type="button" className="login-screen__button login-screen__button--with-facebook" onClick={this.loginWithFacebook}>Login with Facebook</button>
                        <span className="login-screen--separate">OR</span>
                        <form>
                            <input className="login-screen__input login-screen--separate" type="text" placeholder="Email address" onChange={this.setEmail}/>
                            <input className="login-screen__input login-screen--separate" type="password" placeholder="Password" onChange={this.setPassword}/>
                            <button className="login-screen__button login-screen--separate" type="button" onClick={this.loginWithEmail}><i className="material-icons">person</i><span>Login</span></button>
                        </form>
                    </div>
                </div>
            )
        }
    }
}

//Maps the state in our store to the props property of the Example object.
const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        email: state.login.email,
        password: state.login.password
    }
}

//Wrapping the action creators in a dispatch call and allowing us to 
//access them through the props property of the Example object. 
const mapDispatchToProps = {
    login,
    logout,
    setEmail,
    setPassword
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);