import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formatDate, formatLocation } from '../../utils/utils';
import './styles/eventheader.css';

const EventHeader = (props) => {

    return (
        <div className="event-header" style={ getHeaderImgStyle(props.headerImage) }>
            <div className="event-header__gradient">
                <div className="event-header__content">
                    <div className="event-header__title">
                        <h1>{ props.name }</h1>
                    </div>
                </div>
            </div>
        </div> 
    )
    
}

function getHeaderImgStyle(headerImage) {
    return {
      backgroundImage: 'url(' + headerImage + ')',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      overflow: 'hidden',
    };
}

export default (EventHeader);