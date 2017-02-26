import React from 'react';
import { browserHistory } from 'react-router';
import './styles/navigationcontrol.css';
import Api from "../../api/Api";

const NavigationControl = (props) => {

    // If logged in
    if(props.user && !props.user.isAnonymous) {

        return (
            <div className="navigationcontrol">
                <div className="navigationcontrol-item">
                     <button className="navigationcontrol-item__button" onClick={goToHome}><i className="material-icons">home</i><br className="only-on-mobile"/><span className="">Home</span></button>
                </div>
                <div className="navigationcontrol-item">
                     <button className="navigationcontrol-item__button" onClick={goToProfile}><i className="material-icons">person</i><br className="only-on-mobile"/><span className="">Profile</span></button>
                </div>
                { (props.template === "eventviewer") ? renderEventViewerAdminSettings(props.user, props.eventId) : null }
                { (props.template === "eventeditor") ? renderEventEditorAdminSettings(props.user, props.eventId) : null }
                <div className="navigationcontrol-item">
                  <button className="navigationcontrol-item__button" onClick={logout}><i className="material-icons">door</i><span>Logout</span></button>
                </div>
            </div> 
        )
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

function logout() {
  Api.auth.logout()
    .then(goToHome);
}

function goToProfile() {
    browserHistory.push('/user/');
}

function goToHome() {
    browserHistory.push('/');
}

function gotoEventSettings(eventId) {
    browserHistory.push('/eventsettings/' + eventId);
}

function gotoEvent(eventId) {
    browserHistory.push('/event/' + eventId);
}

function renderEventViewerAdminSettings(user, eventId) {
    return (
         <div className="navigationcontrol-item">
             <button className="navigationcontrol-item__button" onClick={() => gotoEventSettings(eventId)}><i className="material-icons">settings</i><br className="only-on-mobile"/><span className="">Settings</span></button>
        </div>
    );
}

function renderEventEditorAdminSettings(user, eventId) {
    return (
         <div className="navigationcontrol-item">
             <button className="navigationcontrol-item__button" onClick={() => gotoEvent(eventId)}><i className="material-icons">event</i><br className="only-on-mobile"/><span className="">Event</span></button>
        </div>
    );
}

export default (NavigationControl);