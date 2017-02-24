import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import IconButton from '../Utils/IconButtonField';
import CheckBox from '../Utils/CheckBoxField';
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
            const { handleModuleSaved } = this.props;
            return (
                <form onSubmit={handleModuleSaved}>
                    <div className={(this.props.module.enabled) ? "eventeditor-participants" : "eventeditor-participants disabled"}>
                        <div className="eventeditor-participants__header">
                            <i className="material-icons color-blue">person</i> <span> Participants ({ (this.props.participants) ? Object.keys(this.props.participants).length : "-" })</span>
                        </div>
                        <div className="eventeditor-participants__mainenabler">
                            <Field label="Show module" name="participantsEnabled" component={CheckBox} />
                            <Field mIcon="save" label="Save" name="participantsSave" component={IconButton} />
                        </div>
                        <div className="eventeditor-participants__list"> 
                            { renderParticipants(this.props.participants) } 
                        </div>
                    </div> 
                </form>
            )
        }
        else {
            return (
                null
            )
        }
    }
    
}

// Decorate the form component
EventEditorParticipants = reduxForm({
  form: 'moduleparticipants', // a unique name for this form
  enableReinitialize: true
})(EventEditorParticipants);

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
            participantsEnabled: state.eventmodules.participants.enabled
        }
    }
}

//Wrapping the action creators in a dispatch call and allowing us to 
//access them through the props property of the Example object. 
const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(EventEditorParticipants);