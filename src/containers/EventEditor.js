import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getEvent, subscribeToEvent, setCurrentEvent, attendEvent } from '../actions/eventviewer';
import EventEditorHeader from '../components/EventEditor/EventEditorHeader';
import EventEditorDetails from '../components/EventEditor/EventEditorDetails';
import EventEditorDescription from '../components/EventEditor/EventEditorDescription';
import EventEditorParticipants from '../components/EventEditor/EventEditorParticipants';
import EventEditorControlpanel from '../components/EventEditor/EventEditorControlpanel';
import NavigationControl from '../components/Navigation/NavigationControl';
import Spinner from '../components/Utils/Spinner';
import './styles/eventeditor.css';
import { loadMapImageURL } from './../actions/maps'

class EventEditor extends Component {
    
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
            return (
                 <div>
                    <NavigationControl user={this.props.user} eventId={this.props.event.id} template="eventeditor" />
                    <div className="event-editor">

                        <EventEditorHeader headerImg={this.props.event.headerImg} name={this.props.event.name} module={this.props.event.modules.headerDetails} startDate={this.props.event.startDate} location={this.props.event.location} />

                        <EventEditorControlpanel />

                        <div className="event-content">
                            <div className="event-content__spotlight">
                                <EventEditorDetails module={this.props.event.modules.eventDetails} startDate={this.props.event.startDate} location={this.props.event.location} map={this.props.map}/>
                                <EventEditorDescription module={this.props.event.modules.eventDescription} description={this.props.event.description} />
                            </div>
                            <div className="event-content__sideline">
                                <EventEditorParticipants module={this.props.event.modules.eventParticipants} participants={this.props.event.participants} />
                            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(EventEditor);