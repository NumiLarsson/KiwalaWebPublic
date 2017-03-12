import React from 'react';
import {browserHistory} from 'react-router';
import FlatButton from 'material-ui/FlatButton';
import Api from '../../api/Api';
import IconButton from '../Utils/IconButton';
import './styles/eventpolls.css';

const EventPolls = (props) => {

    if (props.activePolls && Api.auth.loggedIn() && Api.events.isAttendingEvent(props.eventId, props.uid)) {
        return (
            <div className="event-polls">
                <div className="event-polls__header">
                    <i className="material-icons color-green">poll</i>
                    <span> Active polls ({ Object.keys(props.activePolls).length })</span>
                </div>
                <div className="event-polls__list">
                    { renderPolls(props.activePolls) }
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

function renderPolls(polls) {
    const listItems = []; 

    for (let id in polls) {
        if (polls.hasOwnProperty(id)) {

            let pollChoices = [];

            for (let choice in polls[id].choices) {
              pollChoices.push(
                  <FlatButton label={polls[id].choices[choice]} />
                )
            }

            listItems.push(
                <div key={id} className="event-poll">
                      <div className="event-poll__question">
                        <div className="event-poll__questionmark">?</div>
                        <p>{polls[id].question}</p>
                      </div>
                      <div className="event-poll__results">
                      </div>
                      <div className="event-poll__choices">
                        {pollChoices}
                      </div>
                </div>
            )
        }
    }
    return listItems;
}

export default (EventPolls);