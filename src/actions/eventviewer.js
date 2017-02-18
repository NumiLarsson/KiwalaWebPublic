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
import { push } from 'react-router-redux';
//get the API
import Api from '../api/Api';

//Constants identifying actions.
export const EVENT_ACTIONS = {
    GET_EVENT : 'GET_EVENT',
    SET_CURRENT_EVENT : 'SET_CURRENT_EVENT',
    ATTEND_EVENT_SUCCESS: 'ATTEND_EVENT_SUCCESS'
};

//Standard actions.
export const setCurrentEvent = createAction(EVENT_ACTIONS.SET_CURRENT_EVENT);
export const attendSuccessful = createAction(EVENT_ACTIONS.ATTEND_EVENT_SUCCESS);

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

export function subScribeToEvent(eventId) {
    return dispatch => {
        Api.events.subScribeToEvent(eventId, (event) => {
            dispatch(setCurrentEvent(eventId));
        })
        .then(res => {
            console.log(res);
        })
        .catch(error => {
            console.log(error);
            dispatch({type: "GET_EVENT_ERROR", payload: eventId});
        })

    }
}

export function attendEvent(eventId, uid) {
    return dispatch => {
        Api.events.attendEvent(eventId, uid)
        .then(res => {
            dispatch(attendSuccessful(res));
        })
        .catch(err => {
            console.log(err);
        })
    }
}