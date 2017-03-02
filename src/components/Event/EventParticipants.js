import React from 'react';
import './styles/eventparticipants.css';

const EventParticipants = (props) => {

  if (props.module && props.module.enabled && props.participants) {
    return (
      <div className="event-participants">
        <div className="event-participants__header">
          <i className="material-icons color-blue">person</i>
          <span> Participants ({ Object.keys(props.participants).length })</span>
        </div>
        <div className="event-participants__list">
          { renderParticipants(props.participants) }
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

function renderParticipants(participants) {

  const listItems = [];

  for (let id in participants) {
    if (participants.hasOwnProperty(id)) {

      listItems.push(
        <div key={id} className="event-participant">
          { renderAvatar(id, participants) }
          <div className="event-participant__name" title={ participantDisplayName(id, participants) }>{ participantDisplayName(id, participants) }</div>
        </div>
      )
    }
  }
  return listItems;
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

function participantDisplayName(id, participants) {
  if ( typeof participants[id] !== 'object') {
    return id;
  }

  if (participants[id].displayName !== undefined) {
    return participants[id].displayName;
  }

  return participants[id].email;
}

export default (EventParticipants);