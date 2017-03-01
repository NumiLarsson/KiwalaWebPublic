import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Login from '../components/Login/Login';
import NavigationControl from '../components/Navigation/NavigationControl';
import './styles/splashscreen.css';

class SplashScreen extends Component {
    
    loadRandomEvent() {
        this.props.loadRandomEvent();
    }

    render() {
        return (
            <div>
                <NavigationControl user={this.props.user} template="home" />
                <div className="splashscreen">
                    <img src="images/logo.png" role="presentation" className="splashscreen-logo"/>
                    <h1>Kiwala Event Organizer</h1>
                    <br/>
                    <Login />
                </div>
            </div>
        )
    }
}

//Maps the state in our store to the props property of the SplashScreen object.
const mapStateToProps = (state) => {
    return {
        user: state.auth.user
    }
}

//Wrapping the action creators in a dispatch call and allowing us to 
//access them through the props property of the SplashScreen object. 
const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);