import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formatDate, formatLocation } from '../../utils/utils';
import './styles/eventdetails.css';

const EventDetails = (props) => {

    return (
        <div className="event-details">
            { renderStartDate(props.startDate) }
            { renderLocation(props.location) }
            { renderMap(props.location, props.showMap) }
        </div> 
    )
}

function renderStartDate(startDate) {
    if(startDate) {
        return (
            <div>
                <i className="material-icons color-light-blue">event</i>
                <span> { formatDate(startDate) } </span>
            </div>
        );
    }
    else {
        return (
            null
        );
    }
}

function renderLocation(location) {
    if(location) {
        return (
            <div>
                <i className="material-icons color-light-blue">location_on</i>
                <span> { formatLocation(location) } </span>
            </div>
        );
    }
    else {
        return (
            null
        );
    }
}

function renderMap(location, showMap) {
    if(location && showMap) {
        return (
            <div className="event-details__map">
            </div>
        );
    }
    else {
        return (
            null
        );
    }
}

export default (EventDetails);