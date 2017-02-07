import React, { Component } from 'react';
import { connect } from 'react-redux';
import { } from '../../actions/eventviewer';
import './styles/eventdescription.css';

const EventDescription = (props) => {

    return (
        <div className="event-description">
            <i className="material-icons color-light-blue">description</i> <span> Description </span>
            <p> { props.description } </p>
        </div> 
    )
    
}

export default (EventDescription);