import React, { Component } from 'react';
import { connect } from 'react-redux';
import IconButton from '../Utils/IconButton';
import CheckBox from '../Utils/CheckBox';
import './styles/eventeditor_participants.css';

class EventEditorParticipants extends Component {
    
    constructor() {
        super();

        this.handleParticipantsEnabledChange     = this.handleParticipantsEnabledChange.bind(this);
    }

    handleParticipantsEnabledChange(event) {
        //eventDetailsToggled(event.value.checked);
    }

    render() {
        if(this.props.module) {
            return (
                <div className="eventeditor-participants">
                    <div className="eventeditor-participants__header">
                        <i className="material-icons color-blue">person</i> <span> Participants ({ (this.props.participants) ? Object.keys(this.props.participants).length : "-" })</span>
                    </div>
                    <div className="eventeditor-participants__mainenabler">
                        <CheckBox label="Show module" name="participantsEnabled" checked={this.props.module.enabled} />
                        <IconButton mIcon="save" label="Apply" />
                    </div>
                    <div className="eventeditor-participants__list"> 
                        { renderParticipants(this.props.participants) } 
                    </div>
                </div> 
            )
        }
        else {
            return (
                null
            )
        }
    }
    
}

function renderParticipants(participants) {

    const listItems = [];

    for (var key in participants) {
            if (participants.hasOwnProperty(key)) {
                listItems.push(
                    <div key={key} className="eventeditor-participant">
                        { renderAvatar(key) }
                    <div className="eventeditor-participant__name" title={ key }>{ key }</div>
                    </div>
                )
            }
    }
    return listItems;
}

function renderAvatar(participant) {
    if(!participant) {
        return (
            <div className="eventeditor-participant__avatar"></div>
        );
    }
    else {
        return (
            <div className="eventeditor-participant__avatar">
                <div className="eventeditor-participant__default__avatar">
                    <i className="material-icons">person</i>
                </div>
            </div>
        );
    }
}

//Maps the state in our store to the props property of the Example object.
const mapStateToProps = (state) => {
    return {
        module: state.eventmodules.participants,
        participants: state.eventdata.participants,
        initialValues : {
            //detailsEnabled: state.eventmodules.details.enabled
        }
    }
}

//Wrapping the action creators in a dispatch call and allowing us to 
//access them through the props property of the Example object. 
const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(EventEditorParticipants);