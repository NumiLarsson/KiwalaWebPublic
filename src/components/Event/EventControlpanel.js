import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import { connect } from 'react-redux';
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
        const labelStyles = {
            fontSize: "1.1em",
            fontColor: "#424242"
        };

        // If logged in && not attending
        if(this.props.user && !this.props.user.isAnonymous && !isAttendingEvent(this.props.event, this.props.user.uid)) {
            const iconStyles = {
                color: "#43A047"
            };

            return (
                <div className="event-controlpanel-wrapper">
                    <div className="event-controlpanel">
                        <FlatButton onTouchTap={this.attendEvent}
                              label="Attend" backgroundColor="#fff"
                              labelStyle={labelStyles}
                              icon={<FontIcon className="material-icons" style={iconStyles}>event_available</FontIcon>}/>
                    </div>
                </div>
            )
        }
        // If logged in && already attending
        else if(this.props.user && !this.props.user.isAnonymous && isAttendingEvent(this.props.event, this.props.user.uid)) {
            const iconStyles = {
                color: "#E57373"
            };

            return (
                <div className="event-controlpanel-wrapper">
                    <div className="event-controlpanel">
                        <FlatButton onTouchTap={this.unattendEvent}
                              label="Unattend" backgroundColor="#fff"
                              labelStyle={labelStyles}
                              icon={<FontIcon className="material-icons" style={iconStyles}>event_available</FontIcon>}/>
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
    if(event.participants) {
        return (event.participants[userUid]);
    }
    
    return false;
}

//Maps the state in our store to the props property of the Example object.
const mapStateToProps = (state) => {
    return {
        event: state.eventdata,
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