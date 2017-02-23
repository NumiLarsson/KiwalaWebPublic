import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formatDate, formatLocation } from '../../utils/utils';
import { attendEvent, unattendEvent } from '../../actions/eventviewer';
import './styles/eventcontrolpanel.css';

class EventControlpanel extends Component {
    
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
        // If logged in && not attending
        if(this.props.user && !this.props.user.isAnonymous && !isAttendingEvent(this.props.event, this.props.user.uid)) {
            return (
                <div className="event-controlpanel-wrapper">
                    <div className="event-controlpanel">
                        <button className="event-controlpanel__attendbtn" onClick={this.attendEvent}><i className="material-icons">event_available</i> <span>Attend</span></button>
                    </div>
                </div>
            )
        }
        // If logged in && already attending
        else if(this.props.user && !this.props.user.isAnonymous && isAttendingEvent(this.props.event, this.props.user.uid)) {
            return (
                <div className="event-controlpanel-wrapper">
                    <div className="event-controlpanel">
                        <button className="event-controlpanel__unattendbtn" onClick={this.unattendEvent}><i className="material-icons">event_busy</i> <span>Unattend</span></button>
                    </div>
                </div>
            )
        }
        // If not logged in, dont show (or maybe show login/register)
        else {
            return (
                null
            )
        }
    }
}

function isAttendingEvent(event, userUid) {
        return (event.participants[userUid]);
}

//Maps the state in our store to the props property of the Example object.
const mapStateToProps = (state) => {
    return {
        event: state.eventdata.event,
        user: state.auth.user
    }
}

//Wrapping the action creators in a dispatch call and allowing us to 
//access them through the props property of the Example object. 
const mapDispatchToProps = {
    attendEvent,
    unattendEvent
}

export default connect(mapStateToProps, mapDispatchToProps)(EventControlpanel);