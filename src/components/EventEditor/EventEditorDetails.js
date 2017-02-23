import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formatDate, formatLocation } from '../../utils/utils';
import IconButton from '../Utils/IconButton';
import CheckBox from '../Utils/CheckBox';
import './styles/eventeditor_details.css';

const EventEditorDetails = (props) => {

    if(props.module) {
        return (
            <div className={(props.module.enabled) ? "eventeditor-details" : "eventeditor-details disabled"}>
                <div className="eventeditor-details__header">
                    <i className="material-icons color-blue">info</i> <span> Details </span>
                </div>
                <div className="eventeditor-details__mainenabler">
                    <CheckBox label="Show module" checked={props.module.enabled} />
                    <IconButton mIcon="save" label="Apply" />
                </div>
                { renderStartDate(props.module, props.startDate) }
                { renderLocation(props.module, props.location) }
                { renderMap(props.module, props.map) }
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
    return (
        <div className="eventeditor-details__enabler">
            <CheckBox label="Show date" checked={module.showTime} disabled={!module.enabled} />
            <div className="eventeditor-details__item">
                <i className="material-icons color-gray">event</i>
                <div className="event-details__item-text" title={ formatDate(startDate) }> { formatDate(startDate) } </div>
            </div>
        </div>
    );
}

function renderLocation(module, location) {
    return (
         <div className="eventeditor-details__enabler">
            <CheckBox label="Show location" checked={module.showLocation} disabled={!module.enabled} />
            <div className="eventeditor-details__item">
                <i className="material-icons color-gray">location_on</i>
                <div className="eventeditor-details__item-text" title={ formatLocation(location) }> { formatLocation(location) } </div>
            </div>
        </div>
    );
}

function renderMap(module, map) {

    return (
        <div className="eventeditor-details__enabler">
            <CheckBox label="Show map" checked={module.showMap} disabled={!module.enabled} />
            <div className="eventeditor-details__map">
                <img className="map-image" src={map} />
            </div>
        </div>
    );
}

export default (EventEditorDetails);