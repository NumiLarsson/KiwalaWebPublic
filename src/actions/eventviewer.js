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

//get action types
import { EVENT_ACTIONS } from './actionTypes';


//Standard actions.
export const attendSuccessful = createAction(EVENT_ACTIONS.ATTEND_EVENT_SUCCESS);
export const unattendSuccessful = createAction(EVENT_ACTIONS.UNATTEND_EVENT_SUCCESS);

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

export function unattendEvent(eventId, uid) {
    return dispatch => {
        Api.events.unattendEvent(eventId, uid)
        .then(res => {
            dispatch(unattendSuccessful(res));
        })
        .catch(err => {
            console.log(err);
        })
    }
}