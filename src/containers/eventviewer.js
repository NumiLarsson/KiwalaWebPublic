import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getEvent, setCurrentEvent } from '../actions/eventviewer';
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
        return (
            <div className="event_viewer">
                <div className="header">
                    <h1>{ getEventTitle(this.props.event) }</h1>
                </div> 
                { getEventDescription(this.props.event) }
            </div>
        )
    }
}

function getEventTitle(event) {
    return (!event) ? "Loading": event.name;
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