import React, { Component } from 'react';
import { connect } from 'react-redux';
import './styles/eventlist.css';
import api from '../api/Api';
import { addEvent, removeEvent, updateEvent } from './../actions/events'
import { Link } from 'react-router';
import { loadMapImageURL} from './../actions/maps'


class EventList extends Component {

    formatEvents(events) {
        const formattedEvents = events.map( 
            (event) => 
                <li key={event.id}>
                    <Link to={`/event:${event.id}`}>
                        {event.name}
                    </Link>
                </li>
        )
        return formattedEvents
    }


    render() {
        let {title, counter, loadRandomEvent,
             increaseCounter, changeTitleAsync, name, events} = this.props;
        return (
            <div className="index">
                <div className="Test">
                    {name}
                    {this.formatEvents(events)}
                </div>
            </div>
        )
    }
}

//Maps the state in our store to the props property of the Example object.
const mapStateToProps = (state) => {
    return {
        events: state.events.events
    }
}

//Wrapping the action creators in a dispatch call and allowing us to 
//access them through the props property of the Example object. 
const mapDispatchToProps = {
    addEvent,
    removeEvent,
    updateEvent,
    loadMapImageURL
}

export default connect(mapStateToProps, mapDispatchToProps)(EventList);