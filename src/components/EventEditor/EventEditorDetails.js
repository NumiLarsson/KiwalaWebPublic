import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formatDate, formatLocation } from '../../utils/utils';
import IconButton from '../Utils/IconButton';
import CheckBox from '../Utils/CheckBox';
import './styles/eventeditor_details.css';

const EventEditorDetails = (props) => {

    if(props.module.enabled) {

        return (
            <div className="eventeditor-details">
                <div className="eventeditor-details__mainenabler">
                    <CheckBox label="Show module" checked={true} />
                    <IconButton mIcon="save" label="Apply" />
                </div>
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
            <div className="eventeditor-details__enabler">
                    <CheckBox label="Show date" checked={true} />
                    <div className="eventeditor-details__item">
                        <i className="material-icons color-blue">event</i>
                        <div className="event-details__item-text" title={ formatDate(startDate) }> { formatDate(startDate) } </div>
                    </div>
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
             <div className="eventeditor-details__enabler">
                    <CheckBox label="Show location" checked={true} />
                    <div className="eventeditor-details__item">
                        <i className="material-icons color-blue">location_on</i>
                        <div className="eventeditor-details__item-text" title={ formatLocation(location) }> { formatLocation(location) } </div>
                    </div>
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
            <div className="eventeditor-details__enabler">
                <CheckBox label="Show map" checked={true} />
                <div className="eventeditor-details__map">
                    <img className="map-image" src={map} />
                </div>
            </div>
        );
    }
    else {
        return (
            null
        );
    }
}

export default (EventEditorDetails);