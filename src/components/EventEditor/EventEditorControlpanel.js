import React, { Component } from 'react';
import { connect } from 'react-redux';
import PollEditor from './PollEditor';
import './styles/eventeditor_controlpanel.css';

class EventEditorControlpanel extends Component {
    
    constructor() {
        super();

        this.attendEvent            = this.attendEvent.bind(this)
        this.unattendEvent          = this.unattendEvent.bind(this)

        this.handlePollsModalSaved  = this.handlePollsModalSaved.bind(this)
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

    handlePollsModalSaved(values) {
        this.props.handlePollsModalSaved(values);
    }

    render() {
        return (
            <div className="eventeditor-controlpanel-wrapper">
                <div className="eventeditor-controlpanel">
                    <PollEditor onSubmit={this.handlePollsModalSaved} />
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