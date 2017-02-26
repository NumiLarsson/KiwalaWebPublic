import React from 'react';
import { browserHistory } from 'react-router';
import './styles/upcomingeventslist.css';
import { formatDate, formatLocation } from '../../utils/utils';

const UpcomingEventsList = (props) => {
    let eventsToRender = [];
    eventsToRender = formatEvents(props.eventList)
    return (
        <div className="upcomingeventslist">
            <div className="eventslist">
                {eventsToRender}
            </div>
        </div>
    )
}

export default (UpcomingEventsList);

function formatEvents(events) {
    const formattedEvents = events.map(
        (event) =>
            <div key={event['eventId']} className="eventlist-event" onClick={goToEvent.bind(this, event['eventId'])}>
                <div className="eventlist-header" style={getHeaderImgStyle(event['eventData']['headerImage'])}>
                    <div className="eventlist-header__gradient">
                        <div className="eventlist-event__title" >
                            {event.name}
                        </div>
                    </div>
                </div>

                <div className="eventlist-event__details" >
                    {renderEventDateString(event['eventData']['location'])}
                    {renderEventLocationString(event['eventData']['startDate'])}
                </div>
            </div>
    )
    return formattedEvents
}

function goToEvent(id) {
    browserHistory.push('/event/' + id);
}

function getHeaderImgStyle(headerImage) {
    return {
        backgroundImage: 'url(../images/event_header_default.jpg)',
        //backgroundImage: 'url(' + headerImage + ')',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        overflow: 'hidden',
    };
}

function renderEventDateString(startDate) {
    return (
        <div className="eventlist-event__date">
            <i className="material-icons color-gray">
                event
                </i>
            <span>{(startDate)}</span>
        </div>
    );
}

function renderEventLocationString(location) {
    return (
        <div className="eventlist-event__location">
            <i className="material-icons color-gray">
                location_on
            </i>
            <span>{formatLocation(location)}</span>
        </div>
    );
}