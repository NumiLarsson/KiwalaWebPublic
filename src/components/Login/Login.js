import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setEmail, setPassword, login, logout } from '../../actions/login';
import EventDetails from '../Event/EventDetails';
import EventDescription from '../Event/EventDescription';
import EventParticipants from '../Event/EventParticipants';
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
                    <button type="button" onClick={this.loginWithFacebook}>Login with Facebook</button>
                    <span>OR</span>
                    <br />
                    <form>
                        <input className="login-screen__input" type="text" placeholder="Email address" onChange={this.setEmail}/>
                        <br />
                        <input className="login-screen__input" type="password" placeholder="Password" onChange={this.setPassword}/>
                        <br />
                        <button className="login-screen__button" type="button" onClick={this.loginWithEmail}><i className="material-icons">person</i><span>Login</span></button>
                    </form>
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