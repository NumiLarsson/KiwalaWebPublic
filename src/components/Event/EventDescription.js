import React, { Component } from 'react';
import { connect } from 'react-redux';
import './styles/eventdescription.css';

const EventDescription = (props) => {

    if(props.module.enabled) {
        return (
            <div className="event-description">
                <div className="event-description__header">
                    <i className="material-icons color-light-blue">description</i> <span> Description </span>
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

export default (EventDescription);