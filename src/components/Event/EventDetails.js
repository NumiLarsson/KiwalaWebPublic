import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formatDate, formatLocation } from '../../utils/utils';
import './styles/eventdetails.css';

const EventDetails = (props) => {

    return (
        <div className="event-details">
            { renderStartDate(props.startDate) }
            { renderLocation(props.location) }
            { renderMap(props.showMap) }
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
                <i className="material-icons color-light-blue">event</i>
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

function renderMap(showMap) {

}

export default (EventDetails);