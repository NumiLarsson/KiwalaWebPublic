/**
 * Actions can be dispatched and caught by reduders. 
 * A standard action is defined as an object with a type property and a payload as well as an optional error property.
 * {type: 'example', payload:{counterValue: 10}}
 * Action creators are functions that return actions. It is customary to pass the result of an action creator to
 * the dispatch function like this: dispatch(actionCreator())
 */
//createAction is an action creator used to create standard actions.
import { createAction } from 'redux-actions';
//push can be used to navigate. dispatch(push('path'))
import {  } from 'react-router-redux';
//get the API
import Api from '../api/Api';

import { loadMapImageURL } from './maps'
//get action types
import { EVENT_ACTIONS } from './actionTypes';

//Standard actions.
export const setCurrentEvent                        = createAction(EVENT_ACTIONS.SET_CURRENT_EVENT);
export const setCurrentEventData                    = createAction(EVENT_ACTIONS.SET_CURRENT_EVENT_DATA);
export const setCurrentEventParticipants            = createAction(EVENT_ACTIONS.SET_CURRENT_EVENT_PARTICIPANTS);
export const updateCurrentEventParticipantsUsers    = createAction(EVENT_ACTIONS.UPDATE_CURRENT_EVENT_PARTICIPANTS_USERS);
export const setCurrentEventModules                 = createAction(EVENT_ACTIONS.SET_CURRENT_EVENT_MODULES);
export const setEventAdminPrivileges                = createAction(EVENT_ACTIONS.SET_EVENT_ADMIN_PRIVILEGES);
export const setCurrentEventPoll                    = createAction(EVENT_ACTIONS.SET_EVENT_POLL);
export const setCurrentEventPollAnswers             = createAction(EVENT_ACTIONS.SET_EVENT_POLL_ANSWERS);
export const eventPollAnswered                      = createAction(EVENT_ACTIONS.EVENT_POLL_ANSWERED);
export const eventPollRemoved                       = createAction(EVENT_ACTIONS.EVENT_POLL_REMOVED);
export const eventPollAnswersRemoved                = createAction(EVENT_ACTIONS.EVENT_POLL_ANSWERS_REMOVED);

//Async action. This is what the thunk middleware lets us do.
export function getEvent(eventId) {
    return dispatch => {
        Api.events.getEvent(eventId)
        .then((event) => {
            dispatch(setCurrentEvent(event))
        })
        .catch((error) => {
            console.log(error);
            dispatch({type: "GET_EVENT_ERROR", payload: eventId});
        })
    }
}

export function subscribeToEvent(eventId) {
    return dispatch => {
        Api.events.clearSubscriptions();

        Api.events.subscribeToEvent(eventId, (event) => {
            dispatch(setCurrentEvent(event));
        });
        Api.events.subscribeToEventData(eventId, (event) => {
            dispatch(loadMapImageURL(event.location, 12));
            dispatch(setCurrentEventData(event));
        });
        Api.events.subscribeToEventModules(eventId, (event) => {
            dispatch(setCurrentEventModules(event));
        });
        Api.events.subscribeToEventPolls(eventId, (poll) => {
            dispatch(setCurrentEventPoll(poll));

            Api.events.subscribeToEventPollAnswers(poll.id, (pollAnswers) => {
                dispatch(setCurrentEventPollAnswers(pollAnswers));
            }, (pollAnswers) => {
                dispatch(setCurrentEventPollAnswers(pollAnswers));
            });
            
        }, (poll) => {
            dispatch(setCurrentEventPoll(poll));
        }, (poll) => {
            dispatch(eventPollRemoved(poll.id));
        });
        Api.events.subscribeToEventParticipants(eventId, (eventParticipants) => {
            dispatch(setCurrentEventParticipants(eventParticipants));

            // Clear subs before applying more
            Api.user.clearSubscriptions();
            for (let participantId in eventParticipants) {
                if (eventParticipants.hasOwnProperty(participantId)) {
                    Api.user.subscribeToUserData(participantId, user => {
                        user.uid = participantId;
                        dispatch(updateCurrentEventParticipantsUsers(user));
                    })
                }
            }
        });
    }
}

export function removePollFromEvent(eventId, pollId) {
    return dispatch => {
        Api.events.removeEventPoll(eventId, pollId, function() {
            //dispatch(eventPollRemoved(pollId));

            //if error
            //dispatch({type: "CREATE_EVENTPOLL_ERROR", payload: {eventId: eventId, pollData: pollData}});
        }, function() {
            dispatch(eventPollAnswersRemoved());

            //if error
            //dispatch({type: "CREATE_EVENTPOLL_ERROR", payload: {eventId: eventId, pollData: pollData}});
        });
    }
}

export function answerEventPoll(uid, pollId, answerId) {
    return dispatch => {
        Api.events.answerEventPoll(uid, pollId, answerId)
        .then((result) => {
            dispatch(eventPollAnswered(result));
        })
        .catch((error) => {
            console.log(error);
            dispatch({type: "ANSWER_EVENTPOLL_ERROR", payload: pollId});
        })
    }
}

export function hasAdminPrivileges(eventId, uid) {
    return dispatch => {
        Api.events.hasAdminPrivileges(eventId, uid)
        .then((result) => {
            dispatch(setEventAdminPrivileges(result))
        })
        .catch((error) => {
            console.log(error);
            dispatch({type: "GET_EVENT_ERROR", payload: eventId});
        })
    }
}