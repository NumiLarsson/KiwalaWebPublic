import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { userLoggedIn, userLoggedOut } from '../actions/auth';
import Login from './Login';
import './styles/splashscreen.css';
import api from '../api/Api';

class SplashScreen extends Component {
    
    constructor() {
        super();
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    loadRandomEvent() {
        this.props.loadRandomEvent();
    }

    login() {
        api.auth.loginWithEmail("jonas.olander91@gmail.com", "1234567")
        .then(user => {
            console.log(user);
            this.props.userLoggedIn(user);
        })
        .catch(error => {
            console.log(error);
        })
    }

    logout() {
        api.auth.logout()
        .then(result => {
            console.log(result);
            this.props.userLoggedOut(result);
        })
        .catch(error => {
            console.log(error);
        })
    }

    render() {
        return (
            <div className="splashscreen">
                <h1>Demo</h1>
                <Link to={'event/2'}>Load demo event</Link>
                <br/>
                <Login />
            </div>
        )
    }
}

//Maps the state in our store to the props property of the SplashScreen object.
const mapStateToProps = (state) => {
    return {
    }
}

//Wrapping the action creators in a dispatch call and allowing us to 
//access them through the props property of the SplashScreen object. 
const mapDispatchToProps = {
    userLoggedIn,
    userLoggedOut
}

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);