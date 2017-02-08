import React, { Component } from 'react';
import { connect } from 'react-redux';
import './styles/eventdescription.css';

const EventDescription = (props) => {

    if(props.description) {
        return (
            <div className="event-description">
                <i className="material-icons color-light-blue">description</i> <span> Description </span>
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