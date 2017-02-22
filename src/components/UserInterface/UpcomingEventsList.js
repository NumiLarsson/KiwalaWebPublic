import React, { Component } from 'react';
import { connect } from 'react-redux';
import api from '../../api/Api';
import Event from '../../models/Event'
import { Link } from 'react-router';
import Spinner from '../Utils/Spinner';
import './styles/upcomingeventslist.css';
import { formatDate, formatLocation } from '../../utils/utils';
import NavigationControl from '../Navigation/NavigationControl';

const FAKE_EVENT_DATA = [
    new Event(10, "FakeEvent1", new Date(), "Uppsala", "Hello World", null, null), 
    new Event(2, "Awesome event at the beach", new Date(), "Stockholm", "Hello World", null, null)
]

class UpcomingEventsList extends Component {
    formatEvents(events) {
        console.log(events);
        const formattedEvents = events.map(
            (event) => 
                <div key={event.id} className="eventlist-event">
                    <div className="eventlist-header" style={this.getHeaderImgStyle()}>
                        <div className="eventlist-header__gradient">
                            <div className="eventlist-event__title" > 
                                    {event.name}
                            </div>
                        </div>
                    </div>

                    <div className="eventlist-event__details" >
                        { this.renderEventDateString(event.startDate) }
                        { this.renderEventLocationString(event.location) }
                    </div>
                </div>
        )
        return formattedEvents
    }

    goToEvent(id) {
        console.log("Going to event" + id);
    }
     
    getHeaderImgStyle(headerImg) {
        return {
            backgroundImage: 'url(../images/event_header_default.jpg)',
            //backgroundImage: 'url(' + headerImg + ')',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            overflow: 'hidden',
        };
    }

    renderEventDateString(startDate) {
        return (
            <div className="eventlist-event__date">
                <i className="material-icons color-gray">
                    event
                </i> 
                <span>{ formatDate(startDate) }</span>
            </div>
        );
    }
    renderEventLocationString(location) {
        return (
            <div className="eventlist-event__location">
            <i className="material-icons color-gray">
                location_on
            </i> 
            <span>{ formatLocation(location) }</span>
            </div>
        );
    }

    render() {
        /*if(this.props.auth.user) {
            return (
                <Spinner label="Loading" />
            )
        } else {*/
            let { auth } = this.props;
            let eventsToRender = [];
            if (auth.user){
                return (
                    <Spinner label="Fix the database please" />
                )
            } else {
                eventsToRender = this.formatEvents(FAKE_EVENT_DATA);
            }
            if (auth) {
                return (
                    <div className="upcomingeventslist"> 
                        <NavigationControl user={this.props.user} template="eventviewer" />

                        <div className="eventslist">
                            {eventsToRender}
                        </div>
                    </div>
                )
            }
        //}
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