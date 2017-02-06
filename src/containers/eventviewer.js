import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getEvent, setCurrentEvent } from '../actions/eventviewer';
import EventHeader from '../components/Event/EventHeader';
import EventDescription from '../components/Event/EventDescription';
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
                    <EventHeader />

                    <div className="event-content">
                        {(this.props.event.description) ? (
                            <EventDescription />
                        ) : ( null )
                        }
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