import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formatDate, formatLocation } from '../../utils/utils';
import { attendEvent, unattendEvent } from '../../actions/eventviewer';
import './styles/eventeditor_controlpanel.css';

class EventEditorControlpanel extends Component {
    
    constructor() {
        super();

        this.attendEvent = this.attendEvent.bind(this)
        this.unattendEvent = this.unattendEvent.bind(this)
    }

    componentDidMount(){
        // perform any preparations for an upcoming update
        // Enable loading state
    }

    attendEvent() {
        this.props.attendEvent(this.props.event.id, this.props.user.uid);
    }

    unattendEvent() {
        this.props.unattendEvent(this.props.event.id, this.props.user.uid);
    }

    render() {
        return (
            <div className="event-controlpanel-wrapper">
                <div className="event-controlpanel">
                    <button className="event-controlpanel__button" onClick={this.attendEvent}><i className="material-icons">add</i> <span>Add module</span></button>
                </div>
            </div>
        )
    }
}

function isAttendingEvent(event, userUid) {
        return (event.participants[userUid]);
}

//Maps the state in our store to the props property of the Example object.
const mapStateToProps = (state) => {
    return {
        event: state.eventviewer.event,
        user: state.auth.user
    }
}

//Wrapping the action creators in a dispatch call and allowing us to 
//access them through the props property of the Example object. 
const mapDispatchToProps = {
    attendEvent,
    unattendEvent
}

export default connect(mapStateToProps, mapDispatchToProps)(EventEditorControlpanel);