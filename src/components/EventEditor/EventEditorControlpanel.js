import React, { Component } from 'react';
import { connect } from 'react-redux';
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
            <div className="eventeditor-controlpanel-wrapper">
                <div className="eventeditor-controlpanel">
                    <button className="eventeditor-controlpanel__button" onClick={this.attendEvent}><span>Create Poll</span> <i className="material-icons">poll</i></button>
                </div>
            </div>
        )
    }
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
}

export default connect(mapStateToProps, mapDispatchToProps)(EventEditorControlpanel);