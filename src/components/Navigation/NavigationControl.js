import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import './styles/navigationcontrol.css';

const NavigationControl = (props) => {

    // If logged in
    if(props.user && !props.user.isAnonymous) {

        if(props.template == "eventviewer") {
            return (
                <div className="navigationcontrol">
                    <div className="navigationcontrol-item">
                         <button className="navigationcontrol-item__button" onClick={goToHome}><i className="material-icons">home</i><br className="only-on-mobile"/><span className="">Home</span></button>
                    </div>
                    <div className="navigationcontrol-item">
                         <button className="navigationcontrol-item__button"><i className="material-icons">person</i><br className="only-on-mobile"/><span className="">Profile</span></button>
                    </div>
                    { renderAdminSettings(props.user) }
                </div> 
            )
        }
        else {
            return (
                <div className="navigationcontrol">
                    <div className="navigationcontrol-item">
                         <button className="navigationcontrol-item__button" onClick={goToHome}><i className="material-icons">home</i><br className="only-on-mobile"/><span className="">Home</span></button>
                    </div>
                    <div className="navigationcontrol-item">
                         <button className="navigationcontrol-item__button"><i className="material-icons">person</i><br className="only-on-mobile"/><span className="">Profile</span></button>
                    </div>
                </div> 
            )
        }
    }
    else {
        return (
             <div className="navigationcontrol">
                <div className="navigationcontrol-item">
                     <button className="navigationcontrol-item__button" onClick={goToHome}><i className="material-icons color-dark-blue">person</i><br className="only-on-mobile"/><span className="color-dark-blue">Login</span></button>
                </div>
                <div className="navigationcontrol-item">
                     <button className="navigationcontrol-item__button" onClick={goToHome}><i className="material-icons color-dark-green">person_add</i><br className="only-on-mobile"/><span className="color-dark-green">Register</span></button>
                </div>
            </div> 
        )
    }
    
}

function goToHome() {
    browserHistory.push('/');
}

function renderAdminSettings(user) {
    if(true) {
        return (
             <div className="navigationcontrol-item">
                 <button className="navigationcontrol-item__button"><i className="material-icons">settings</i><br className="only-on-mobile"/><span className="">Settings</span></button>
            </div>
        );
    }
    else {
        return (
            null
        );
    }
}

export default (NavigationControl);