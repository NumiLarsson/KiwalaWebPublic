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

//get action types
import { EVENT_ACTIONS } from './actionTypes';

//Standard actions.
export const setCurrentEvent                     = createAction(EVENT_ACTIONS.SET_CURRENT_EVENT);
export const setCurrentEventData                 = createAction(EVENT_ACTIONS.SET_CURRENT_EVENT_DATA);
export const setCurrentEventParticipants         = createAction(EVENT_ACTIONS.SET_CURRENT_EVENT_PARTICIPANTS);
export const updateCurrentEventParticipantsUsers = createAction(EVENT_ACTIONS.UPDATE_CURRENT_EVENT_PARTICIPANTS_USERS);
export const setCurrentEventModules              = createAction(EVENT_ACTIONS.SET_CURRENT_EVENT_MODULES);

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
            dispatch(setCurrentEventData(event));
        });
        Api.events.subscribeToEventModules(eventId, (event) => {
            dispatch(setCurrentEventModules(event));
        });
        Api.events.subscribeToEventParticipants(eventId, (eventParticipants) => {
            dispatch(setCurrentEventParticipants(eventParticipants));
            console.log(eventParticipants);
            
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