import React, { Component } from 'react';
import { connect } from 'react-redux';
import './styles/eventparticipants.css';

const EventParticipants = (props) => {

    if(props.module.enabled) {
        return (
            <div className="event-participants">
                <div className="event-participants__header">
                    <i className="material-icons color-blue">person</i> <span> Participants ({ Object.keys(props.participants).length })</span>
                </div>
                <div className="event-participants__list"> 
                    { renderParticipants(props.participants) } 
                </div>
            </div> 
        )
    }
    else {
        return (
            null
        )
    }
    
}

function renderParticipants(participants) {

    const listItems = [];

    for (var key in participants) {
            if (participants.hasOwnProperty(key)) {
                listItems.push(
                    <div key={key} className="event-participant">
                        { renderAvatar(key) }
                    <div className="event-participant__name" title={ key }>{ key }</div>
                    </div>
                )
            }
    }
    return listItems;
}

function renderAvatar(participant) {
    if(!participant) {
        return (
            <div className="event-participant__avatar"></div>
        );
    }
    else {
        return (
            <div className="event-participant__avatar">
                <div className="event-participant__default__avatar">
                    <i className="material-icons">person</i>
                </div>
            </div>
        );
    }
}

export default (EventParticipants);