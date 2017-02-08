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
                    <div className="event-header__info">
                        { renderEventDateString(props.startDate) }
                        { renderEventLocationString(props.location) }
                    </div>
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

function renderEventDateString(startDate) {
    if(!startDate) {
        return (
            null
        );
    }
    else {
        return (
             <div>
               <i className="material-icons color-white">event</i> <span>{ formatDate(startDate) }</span>
            </div>
        );
    }
}

function renderEventLocationString(location) {
    if(!location) {
        return (
            null
        );
    }
    else {
        return (
             <div>
               <i className="material-icons color-white">location_on</i> <span>{ formatLocation(location) }</span>
            </div>
        );
    }
}

export default (EventHeader);