import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getEvent, setCurrentEvent } from '../actions/eventviewer';
import EventHeader from '../components/Event/EventHeader';
import EventDetails from '../components/Event/EventDetails';
import EventDescription from '../components/Event/EventDescription';
import EventParticipants from '../components/Event/EventParticipants';
import EventControlpanel from '../components/Event/EventControlpanel';
import Spinner from '../components/Utils/Spinner';
import './styles/eventviewer.css';

class EventViewer extends Component {
    
    constructor() {
        super();
    }

    componentDidMount(){
        // perform any preparations for an upcoming update
        // Enable loading state

        // Load event
        this.props.getEvent(2);
    }

    render() {
        if(!this.props.event) {
            return (
                <Spinner label="" />
            )
        }
        else {
            return (
                <div className="event-viewer">
                    <EventHeader headerImg={this.props.event.headerImg} name={this.props.event.name} module={this.props.event.modules.headerDetails} startDate={this.props.event.startDate} location={this.props.event.location} />

                    <EventControlpanel />

                    <div className="event-content">
                        <div className="event-content__spotlight">
                            <EventDetails module={this.props.event.modules.eventDetails} startDate={this.props.event.startDate} location={this.props.event.location} />
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
        event: state.eventviewer.event
    }
}

//Wrapping the action creators in a dispatch call and allowing us to 
//access them through the props property of the Example object. 
const mapDispatchToProps = {
    getEvent,
    setCurrentEvent
}

export default connect(mapStateToProps, mapDispatchToProps)(EventViewer);