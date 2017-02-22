import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formatDate, formatLocation } from '../../utils/utils';
import './styles/eventeditor_header.css';

const EventEditorHeader = (props) => {

    return (
        <div className="eventeditor-header" style={ getHeaderImgStyle(props.headerImg) }>
            <div className="eventeditor-header__gradient">
                <div className="eventeditor-header__content">
                    <div className="eventeditor-header__title">
                        <h1>{ props.name }</h1>
                    </div>
                </div>
            </div>
        </div> 
    )
    
}

function getHeaderImgStyle(headerImg) {
    return {
      backgroundImage: 'url(' + headerImg + ')',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      overflow: 'hidden',
    };
}

export default (EventEditorHeader);