import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formatDate, formatLocation } from '../../utils/utils';
import { attendEvent } from '../../actions/eventviewer';
import './styles/eventcontrolpanel.css';

class EventControlpanel extends Component {
    
    constructor() {
        super();

        this.attendEvent = this.attendEvent.bind(this)
    }

    componentDidMount(){
        // perform any preparations for an upcoming update
        // Enable loading state
    }

    attendEvent() {
        this.props.attendEvent(this.props.event.id, '1234546');
    }

    render() {
        // If logged in && not attending
        if(this.props.user) {
            return (
                <div className="event-controlpanel">
                    <button className="event-controlpanel__attendbtn" onClick={this.attendEvent}><i className="material-icons">event_available</i> <span>Attend</span></button>
                </div>
            )
        }
        // If logged in && already attending
        else if(false) {
            return (
                <div className="event-controlpanel">

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
    attendEvent
}

export default connect(mapStateToProps, mapDispatchToProps)(EventControlpanel);