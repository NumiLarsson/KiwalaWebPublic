import React, { Component } from 'react';
import { connect } from 'react-redux';
import './styles/eventparticipants.css';

const EventParticipants = (props) => {

    if(props.module.enabled) {
        return (
            <div className="event-participants">
                <div className="event-participants__header">
                    <i className="material-icons color-light-blue">person</i> <span> Participants ({ props.participants.length })</span>
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
    const listItems = participants.map((participant) =>
        <div key={participant.id} className="event-participant">
            { renderAvatar(participant) }
            <span className="event-participant__name">{ participant.name }</span>
        </div>
    );

    return listItems;
}

function renderAvatar(participant) {
    if(participant.avatar) {
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