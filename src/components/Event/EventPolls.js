import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import Api from '../../api/Api';
import './styles/eventpolls.css';

const EventPolls = (props) => {

    if (props.module.enabled && props.activePolls && Api.auth.loggedIn() && props.isAttendingEvent) {
        return (
            <div className="event-polls">
                <div className="event-polls__header">
                    <i className="material-icons color-green">poll</i>
                    <span> Active polls</span>
                </div>
                <div className="event-polls__list">
                    { renderPolls(props.activePolls, props.answerPollFunction, props.uid) }
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

function renderPolls(polls, answerPollFunction, uid) {
    const listItems = []; 
    for (let id in polls) {
        if (polls.hasOwnProperty(id) && polls[id].active) {

            let pollChoices = [];
            let sumAns = sumAnswers(polls[id].answers);
            let pollAnswers = []

            for (let choice in polls[id].choices) {
              if(polls[id].answers && polls[id].answers[uid] && polls[id].answers[uid] === choice) {
                pollChoices.push(
                  // If this is already active choice, show it! primary={true}
                  <FlatButton key={choice} label={polls[id].choices[choice]} primary={true} onClick={() => answerPollFunction(id, choice)} />
                )
              }
              else {
                pollChoices.push(
                  <FlatButton key={choice} label={polls[id].choices[choice]} onClick={() => answerPollFunction(id, choice)} />
                )
              }
              pollAnswers.push(
                  {choice: polls[id].choices[choice], count: sumAns[choice]}
              )
            }
            
            listItems.push(
                <div key={id.toString()} className="event-poll">
                      <div className="event-poll__question">
                        <i className="material-icons color-gray">bubble_chart</i>
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

function sumAnswers(answers) {
   let summed = {};
   for(let key in answers) {
       let ans = answers[key];
       if (ans in summed) {
           summed[ans] = summed[ans] + 1;
       } else {
           summed[ans] = 1;
       }
   }
   return summed;
}

export default (EventPolls);