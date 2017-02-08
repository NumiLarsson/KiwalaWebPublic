import React, { Component } from 'react';
import { connect } from 'react-redux';
import './styles/eventparticipants.css';

const EventParticipants = (props) => {

    if(props.module.enabled) {
        return (
            <div className="event-participants">
                <div className="event-description__header">
                    <i className="material-icons color-light-blue">person</i> <span> Participants </span>
                </div>
                <p> { props.participants } </p>
            </div> 
        )
    }
    else {
        return (
            null
        )
    }
    
}

export default (EventParticipants);