import React, { Component } from 'react';
import { connect } from 'react-redux';
import IconButton from '../Utils/IconButton';
import CheckBox from '../Utils/CheckBox';
import './styles/eventeditor_participants.css';

const EventEditorParticipants = (props) => {

    if(props.module) {
        return (
            <div className="eventeditor-participants">
                <div className="eventeditor-participants__header">
                    <i className="material-icons color-blue">person</i> <span> Participants ({ Object.keys(props.participants).length })</span>
                </div>
                <div className="eventeditor-participants__mainenabler">
                    <CheckBox label="Show module" checked={props.module.enabled} />
                    <IconButton mIcon="save" label="Apply" />
                </div>
                <div className="eventeditor-participants__list"> 
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
                    <div key={key} className="eventeditor-participant">
                        { renderAvatar(key) }
                    <div className="eventeditor-participant__name" title={ key }>{ key }</div>
                    </div>
                )
            }
    }
    return listItems;
}

function renderAvatar(participant) {
    if(!participant) {
        return (
            <div className="eventeditor-participant__avatar"></div>
        );
    }
    else {
        return (
            <div className="eventeditor-participant__avatar">
                <div className="eventeditor-participant__default__avatar">
                    <i className="material-icons">person</i>
                </div>
            </div>
        );
    }
}

export default (EventEditorParticipants);