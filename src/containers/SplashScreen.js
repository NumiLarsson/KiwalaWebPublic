import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Login from '../components/Login/Login';
import './styles/splashscreen.css';

class SplashScreen extends Component {
    
    constructor() {
        super();
    }

    loadRandomEvent() {
        this.props.loadRandomEvent();
    }

    render() {
        return (
            <div className="splashscreen">
                <img src="images/logo.png" role="presentation" className="splashscreen-logo"/>
                <h1>Kiwala</h1>
                <Link to={'event/2'}>Demo event</Link>
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
}

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);