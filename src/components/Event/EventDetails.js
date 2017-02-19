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
                { renderMap(props.module, props.map, props.showMap) }
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
            <div className="event-details__item">
                <i className="material-icons color-light-blue">event</i>
                <div className="event-details__item-text" title={ formatDate(startDate) }> { formatDate(startDate) } </div>
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
            <div className="event-details__item">
                <i className="material-icons color-light-blue">location_on</i>
                <div className="event-details__item-text" title={ formatLocation(location) }> { formatLocation(location) } </div>
            </div>
        );
    }
    else {
        return (
            null
        );
    }
}

function renderMap(module, map, showMap) {
    if(module.showMap) {
        return (
            <div className="event-details__map">
                <img className="map-image" src={map} />
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