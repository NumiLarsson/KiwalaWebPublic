import React, { Component } from 'react';
import { connect } from 'react-redux';
import { } from '../../actions/eventviewer';
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
                       <i className="material-icons color-white">event</i> <span>{ translateEventDate(props.startDate) }</span>
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

function translateEventDate(startDate) {
    if(!startDate) {
        return (
            "No date specified"
        );
    }
    else {
        return (
            startDate
        );
    }
}

export default (EventHeader);