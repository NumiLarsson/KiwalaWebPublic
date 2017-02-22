import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getEvent, subscribeToEvent, setCurrentEvent, attendEvent } from '../actions/eventviewer';
import EventHeader from '../components/Event/EventHeader';
import EventDetails from '../components/Event/EventDetails';
import EventDescription from '../components/Event/EventDescription';
import EventParticipants from '../components/Event/EventParticipants';
import EventControlpanel from '../components/Event/EventControlpanel';
import Spinner from '../components/Utils/Spinner';
import './styles/eventviewer.css';
import { loadMapImageURL } from '../actions/maps'

class EventViewer extends Component {
    
    constructor() {
        super();
    }

    componentWillMount(){
        // perform any preparations for an upcoming update
        // Enable loading state
        this.props.loadMapImageURL();
        // Load event
        const {eventid} = this.props.params;
        this.props.subscribeToEvent(eventid);
    }

    render() {
        if(!this.props.event) {
            return (
                <Spinner label="" />
            )
        }
        else {
            console.log(this.props.event);
            return (
                <div className="event-viewer">
                    <EventHeader headerImg={this.props.event.headerImg} name={this.props.event.name} module={this.props.event.modules.headerDetails} startDate={this.props.event.startDate} location={this.props.event.location} />

                    <EventControlpanel />

                    <div className="event-content">
                        <div className="event-content__spotlight">
                            <EventDetails module={this.props.event.modules.eventDetails} startDate={this.props.event.startDate} location={this.props.event.location} map={this.props.map}/>
                            <EventDescription module={this.props.event.modules.eventDescription} description={this.props.event.description} />
                        </div>
                        <div className="event-content__sideline">
                            <EventParticipants module={this.props.event.modules.eventParticipants} participants={this.props.event.participants} />
                        </div>
                    </div>

                </div>
            )
        }
    }
}

//Maps the state in our store to the props property of the Example object.
const mapStateToProps = (state) => {
    return {
        event: state.eventviewer.event,
        user: state.auth.user,
        map: state.eventviewer.map
    }
}

//Wrapping the action creators in a dispatch call and allowing us to 
//access them through the props property of the Example object. 
const mapDispatchToProps = {
    getEvent,
    setCurrentEvent,
    subscribeToEvent,
    attendEvent,
    loadMapImageURL
}

export default connect(mapStateToProps, mapDispatchToProps)(EventViewer);