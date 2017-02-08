import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formatDate, formatLocation } from '../../utils/utils';
import './styles/eventheader.css';

const EventHeader = (props) => {

    return (
        <div className="event-header" style={ getHeaderImgStyle(props.headerImg) }>
            <div className="event-header__gradient">
                <div className="event-header__content">
                    <div className="event-header__title">
                        <h1>{ props.name }</h1>
                    </div>
                    { renderHeaderInfo(props.module, props.startDate, props.location) }
                </div>
            </div>
        </div> 
    )
    
}

function getHeaderImgStyle(headerImg) {
    return {
      backgroundImage: 'url(images/' + headerImg + ')',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      overflow: 'hidden',
    };
}

function renderHeaderInfo(module, startDate, location) {
    if(module.enabled) {
        return (
             <div className="event-header__info">
                { renderEventDateString(module, startDate) }
                { renderEventLocationString(module, location) }
            </div>
        );
    }
    else {
        return (
            null
        );
    }
}

function renderEventDateString(module, startDate) {
    if(module.showTime) {
        return (
             <div>
               <i className="material-icons color-white">event</i> <span>{ formatDate(startDate) }</span>
            </div>
        );
    }
    else {
        return (
            null
        );
    }
}

function renderEventLocationString(module, location) {
    if(module.showLocation) {
        return (
             <div>
               <i className="material-icons color-white">location_on</i> <span>{ formatLocation(location) }</span>
            </div>
        );
    }
    else {
        return (
            null
        );
    }
}

export default (EventHeader);