import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getEvent, subscribeToEvent, setCurrentEvent, hasAdminPrivileges } from '../actions/eventdata';
import EventHeader from '../components/Event/EventHeader';
import EventDetails from '../components/Event/EventDetails';
import EventDescription from '../components/Event/EventDescription';
import EventParticipants from '../components/Event/EventParticipants';
import EventControlpanel from '../components/Event/EventControlpanel';
import NavigationControl from '../components/Navigation/NavigationControl';
import Spinner from '../components/Utils/Spinner';
import './styles/eventviewer.css';
import { loadMapImageURL } from '../actions/maps'

class EventViewer extends Component {

    constructor() {
        super();
        this.adminPrivilegesRequested         = false;
    }

    componentWillMount(){
        // perform any preparations for an upcoming update
        // Enable loading state
        this.props.loadMapImageURL(this.props.event.location, 12);
        // Load event
        const {eventid} = this.props.params;
        this.props.subscribeToEvent(eventid);
    }

    componentWillUpdate() {
        if(this.props.user && !this.adminPrivilegesRequested) {
            const {eventid} = this.props.params;
            this.adminPrivilegesRequested = true;
            this.props.hasAdminPrivileges(eventid, this.props.user.uid);
        }
    }

    render() {
        if(!this.props.event.loaded) {
            return (
                <Spinner label="" />
            )
        }
        else {            
            return (
                <div>
                    <NavigationControl user={this.props.user} eventId={this.props.event.id} template="eventviewer" eventAdminPrivileges={this.props.event.adminLevel} />
                    <div className="event-viewer">

                        <EventHeader headerImage={this.props.event.headerImage} name={this.props.event.name} />

                        <EventControlpanel />

                        <div className="event-content">
                            <div className="event-content__spotlight">
                                <EventDetails module={this.props.modules.details} startDate={this.props.event.startDate} location={this.props.event.location} map={this.props.event.map}/>
                                <EventDescription module={this.props.modules.description} description={this.props.event.description} />
                            </div>
                            <div className="event-content__sideline">
                                <EventParticipants module={this.props.modules.participants} participants={this.props.event.participants} />
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
        event: state.eventdata,
        modules: state.eventmodules,
        user: state.auth.user
    }
}

//Wrapping the action creators in a dispatch call and allowing us to 
//access them through the props property of the Example object. 
const mapDispatchToProps = {
    getEvent,
    setCurrentEvent,
    subscribeToEvent,
    loadMapImageURL,
    hasAdminPrivileges
}

export default connect(mapStateToProps, mapDispatchToProps)(EventViewer);