import React from 'react';
import Api from '../../api/Api';
import Event from '../../models/Event'
import Spinner from '../Utils/Spinner';
import { browserHistory } from 'react-router';
import './styles/upcomingeventslist.css';
import { formatDate, formatLocation } from '../../utils/utils';
import NavigationControl from '../Navigation/NavigationControl';

const FAKE_EVENT_DATA = [
    new Event(10, "FakeEvent1", new Date(), "Uppsala", "Hello World", null, null),
    new Event(2, "Awesome event at the beach", new Date(), "Stockholm", "Hello World", null, null)
]

const UpcomingEventsList = (props) => {
    let eventsToRender = [];
    eventsToRender = formatEvents(props.eventList)
    let { user } = props;
        if (props) {
            return (
                <div className="upcomingeventslist">
                    <NavigationControl user={props.user} template="upcomingeventslist" />

                    <div className="eventslist">
                        {eventsToRender}
                    </div>
                </div>
            )
        }
}

export default (UpcomingEventsList);

/*//Maps the state in our store to the props property of the Example object.
const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        user: state.auth.user,
    }
}

//Wrapping the action creators in a dispatch call and allowing us to 
//access them through the props property of the Example object. 
const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(UpcomingEventsList);*/

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
                    {console.log(event['eventData']['location'])}
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
                date_icon
                </i>
            <span>{(startDate)}</span>
        </div>
    );
}

function renderEventLocationString(location) {
    return (
        <div className="eventlist-event__location">
            <i className="material-icons color-gray">
                location_icon
            </i>
            <span>{formatLocation(location)}</span>
        </div>
    );
}