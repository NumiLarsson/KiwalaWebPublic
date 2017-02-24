import React from 'react';
import './styles/eventdescription.css';

const EventDescription = (props) => {

    if(props.module && props.module.enabled) {
        return (
            <div className="event-description">
                <div className="event-description__header">
                    <i className="material-icons color-blue">description</i> <span> Description </span>
                </div>
                <p className="event-description__description"> { props.description } </p>
            </div> 
        )
    }
    else {
        return (
            null
        )
    }
    
}

export default (EventDescription);