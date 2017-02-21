import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setEmail, setPassword, login } from '../actions/login';
import EventDetails from '../components/Event/EventDetails';
import EventDescription from '../components/Event/EventDescription';
import EventParticipants from '../components/Event/EventParticipants';
import './styles/eventviewer.css';

class Login extends Component {
    
    constructor() {
        super();
        this.setEmail = this.setEmail.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.loginWithEmail = this.loginWithEmail.bind(this);
        this.loginWithFacebook = this.loginWithFacebook.bind(this);
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

    render() {
        return (
            <div className="login-screen">
                <button type="button" onClick={this.loginWithFacebook}>Login with Facebook</button>
                <span>OR</span>
                <form>
                    <input type="text" placeholder="Email address" onChange={this.setEmail}/>
                    <input type="password" placeholder="Password" onChange={this.setPassword}/>
                    <button type="button" onClick={this.loginWithEmail}>Login</button>
                </form>
            </div>
        )
    }
}

//Maps the state in our store to the props property of the Example object.
const mapStateToProps = (state) => {
    return {
        email: state.login.email,
        password: state.login.password
    }
}

//Wrapping the action creators in a dispatch call and allowing us to 
//access them through the props property of the Example object. 
const mapDispatchToProps = {
    login,
    setEmail,
    setPassword
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);