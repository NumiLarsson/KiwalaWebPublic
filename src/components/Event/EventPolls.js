import React from 'react';
import {browserHistory} from 'react-router';
import Api from '../../api/Api';
import './styles/eventpolls.css';

const EventParticipants = (props) => {

    if (props.polls && Api.auth.loggedIn() && Api.events.isAttendingEvent()) {
        return (
            <div className="event-polls">
                <div className="event-polls__header">
                    <i className="material-icons color-green">poll</i>
                    <span> Active polls ({ Object.keys(props.polls).length })</span>
                </div>
                <div className="event-polls__list">
                    { renderPolls(props.polls) }
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
            listItems.push(
                <div key={id} className="event-poll">
                      Yoo
                </div>
            )
        }
    }
    return listItems;
}

export default (EventParticipants);