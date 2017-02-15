import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formatDate, formatLocation } from '../../utils/utils';
import './styles/eventdetails.css';

const EventDetails = (props) => {

    if(props.module.enabled) {

        return (
            <div className="event-details">
                { renderStartDate(props.module, props.startDate) }
                { renderLocation(props.module, props.location) }
                { renderMap(props.module, props.location, props.showMap) }
            </div> 
        )
    }
    else {
        return (
            null
        )
    }
}

function renderStartDate(module, startDate) {
    if(module.showTime) {
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

function renderLocation(module, location) {
    if(module.showLocation) {
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

function renderMap(module, location, showMap) {
    if(module.showMap) {
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