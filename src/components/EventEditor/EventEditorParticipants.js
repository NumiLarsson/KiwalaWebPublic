import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import IconButton from '../Utils/IconButtonField';
import CheckBox from '../Utils/CheckBoxField';
import './styles/eventeditor_participants.css';

class EventEditorParticipants extends Component {
    

    render() {
        if(this.props.module) {
            const { handleSubmit } = this.props;
            return (
                <form onSubmit={handleSubmit}>
                    <div className={(this.props.module.enabled) ? "eventeditor-participants" : "eventeditor-participants disabled"}>
                        <div className="eventeditor-participants__header">
                            <i className="material-icons color-blue">person</i> <span> Participants ({ (this.props.participants) ? Object.keys(this.props.participants).length : "-" })</span>
                        </div>
                        <div className="eventeditor-participants__mainenabler">
                            <Field label="Show module" name="participants_enabled" component={CheckBox} />
                            { renderSubmitButton(this.props.pristine) }
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

function renderSubmitButton(pristine) {
    if(pristine) {
        return (
            null
        );
    }
    else {
        return (
            <Field className="green" mIcon="save" label="Save" name="participants_save" component={IconButton} type="submit" />
        );
    }
}

// Decorate the form component
EventEditorParticipants = reduxForm({
  form: 'module-participants', // a unique name for this form
  enableReinitialize: true
})(EventEditorParticipants);

function renderParticipants(participants) {

    const listItems = [];

    for (var id in participants) {
        if (participants.hasOwnProperty(id)) {
            listItems.push(
                <div key={id} className="eventeditor-participant">
                    { renderAvatar(id, participants) }
                <div className="eventeditor-participant__name" title={ participantDisplayName(id, participants) }>{ participantDisplayName(id, participants) }</div>
                </div>
            )
        }
    }
    return listItems;
}

function participantDisplayName(id, participants) {
    console.log('TEEET');
    console.log(typeof participants[id]);
  if ( typeof participants[id] !== 'object') {
    return id;
  }

  if (participants[id].displayName !== undefined) {
    return participants[id].displayName;
  }

  return participants[id].email;
}

function renderAvatar(id, participants) {
  if (participants[id].photoURL) {
    return (
      <div className="event-participant__avatar" style={getProfileAvatarStyle(participants[id].photoURL)}></div>
    );
  }
  else {
    return (
      <div className="event-participant__avatar">
        <div className="event-participant__default__avatar">
          <i className="material-icons">person</i>
        </div>
      </div>
    );
  }
}

function getProfileAvatarStyle(photoURL) {
    return {
      backgroundImage: 'url(' + photoURL + ')',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      overflow: 'hidden',
    };
}

//Maps the state in our store to the props property of the Example object.
const selector = formValueSelector('module-participants')
const mapStateToProps = (state) => {
    return {
        module: {
            enabled: selector(state, 'participants_enabled')
        },
        participants: state.eventdata.participants,
        initialValues : {
            participants_enabled: state.eventmodules.participants.enabled
        }
    }
}

//Wrapping the action creators in a dispatch call and allowing us to 
//access them through the props property of the Example object. 
const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(EventEditorParticipants);