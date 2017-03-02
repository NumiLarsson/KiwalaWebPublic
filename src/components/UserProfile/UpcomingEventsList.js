import React from 'react';
import { browserHistory } from 'react-router';
import './styles/upcomingeventslist.css';
import { formatDate, formatLocation } from '../../utils/utils';

const UpcomingEventsList = (props) => {
    return (
        <div className="upcomingeventslist">
            <div className="upcomingeventslist-eventlist">
                {Object.values(props.eventList).map(renderEventItem)}
            </div>
        </div>
    )
}

export default (UpcomingEventsList);

function goToEvent(id) {
    browserHistory.push('/event/' + id);
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

function renderEventItem(event){
    if(event && event.eventData && event.eventModules){
        return (
            <div key={event.eventId} className="eventlist-event" onClick={goToEvent.bind(this, event.eventId)}>
                <div className="eventlist-header" style={getHeaderImgStyle(event.eventData.headerImage)}>
                    <div className="eventlist-header__gradient">
                        <div className="eventlist-event__title" >
                            {event.eventData.name}
                        </div>
                    </div>
                </div>

                <div className="eventlist-event__details" >
                    {renderEventDateString(event)}
                    {renderEventLocationString(event)}
                    {renderEventDescriptionString(event)}
                </div>
            </div>
        );
    }
    else {
        return(
            <div key={event.eventId} className="eventlist-event" onClick={goToEvent.bind(this, event.eventId)}>
            </div>
        );
    }
}

function renderEventDateString(event) {
    if(event.eventModules.details.showTime){
        return (
            <div className="eventlist-event__date">
                <i className="material-icons color-gray">
                    event
                    </i>
                <span>{formatDate(event.eventData.startDate)}</span>
            </div>
        );
    }
    else {
        return (
            null
        );
    }
}

function renderEventLocationString(event) {
    if(event.eventModules.details.showLocation){
        return (
            <div className="eventlist-event__location">
                <i className="material-icons color-gray">
                    location_on
                </i>
                <span>{formatLocation(event.eventData.location)}</span>
            </div>
        );
    }
    else {
        return (
            null
        );
    }
}

function renderEventDescriptionString(event) {
    if(event.eventModules.description.enabled){

        let desc = event.eventData.description;
        if(desc.length > 75)
            desc = desc.substr(0, 72) + '...';

        return (
            <div className="eventlist-event__description">
                <i className="material-icons color-gray">
                    description
                    </i>
                <p>{desc}</p>
            </div>
        );
    }
    else {
        return (
            null
        );
    }
}