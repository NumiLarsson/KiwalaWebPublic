import React, { Component } from 'react';
import { connect } from 'react-redux';
import api from '../../api/Api';
import Event from '../../models/Event'
import { Link } from 'react-router';

const FAKE_EVENT_DATA = [
    new Event(10, "FakeEvent1", new Date(), null, "Hello World", null, null), 
    new Event(2, "Awesome event at the beach", new Date(), null, "Hello World", null, null)
]

class UpcomingEventsList extends Component {

    formatEvents(events) {
        const formattedEvents = events.map( 
            (event) => 
                <li key={event.id}>
                    <Link to={`/event/${event.id}`}>
                        {event.name}
                    </Link>
                </li>
        )
        return formattedEvents
    }

    render() {
        let { auth } = this.props;
        let eventsToRender = [];
        if (auth.user){
            eventsToRender = this.formatEvents(auth.user.upcomingEvents);
        } else {
            eventsToRender = this.formatEvents(FAKE_EVENT_DATA);
        }

        if (auth) {
            return (
                <div className="UpcomingEventsList">
                    {eventsToRender}
                </div>
            )
        }
    }
}

//Maps the state in our store to the props property of the Example object.
const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    }
}

//Wrapping the action creators in a dispatch call and allowing us to 
//access them through the props property of the Example object. 
const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(UpcomingEventsList);