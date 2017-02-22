import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getEvent, subscribeToEvent, setCurrentEvent, attendEvent } from '../actions/eventviewer';
import Spinner from '../components/Utils/Spinner';
import './styles/eventviewer.css';
import { loadMapImageURL } from './../actions/maps'

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