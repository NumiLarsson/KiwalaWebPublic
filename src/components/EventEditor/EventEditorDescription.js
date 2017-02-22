import React, { Component } from 'react';
import { connect } from 'react-redux';
import IconButton from '../Utils/IconButton';
import CheckBox from '../Utils/CheckBox';
import './styles/eventeditor_description.css';

const EventEditorDescription = (props) => {

    if(props.module) {
        return (
            <div className="eventeditor-description">
                <div className="eventeditor-description__header">
                    <i className="material-icons color-blue">description</i> <span> Description </span>
                </div>
                <div className="eventeditor-description__mainenabler">
                    <CheckBox label="Show module" checked={props.module.enabled} />
                    <IconButton mIcon="save" label="Apply" />
                </div>
                <p> { props.description } </p>
            </div> 
        )
    }
    else {
        return (
            null
        )
    }
    
}

export default (EventEditorDescription);