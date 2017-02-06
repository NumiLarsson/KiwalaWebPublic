import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getEvent, setCurrentEvent } from '../actions/eventviewer';
import EventHeader from '../components/Event/EventHeader';
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
                <Spinner label="Loading Event" />
            )
        }
        else {
            return (
                <div className="event-viewer">
                    <EventHeader props={this.props} />
                </div>
            )
        }
    }
}

function getEventDescription(event) {
    if(!event) {
       return null; 
    }
    else {
        return (
            <h2> { event.description } </h2>
        );
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