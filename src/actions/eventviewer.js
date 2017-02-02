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
import Api from '../models/__mocks__/api';

//Constants identifying actions.
export const EVENT_ACTIONS = {
    GET_EVENT : 'GET_EVENT',
    SET_CURRENT_EVENT : 'SET_CURRENT_EVENT'
};

//Standard actions.
export const setCurrentEvent = createAction(EVENT_ACTIONS.SET_CURRENT_EVENT);

//Async action. This is what the thunk middleware lets us do.
export function getEvent(val) {
    return (dispatch) => {
        Api.getEvent(val)
        .then((val) => {
            dispatch(setCurrentEvent(val))
        })
        .catch((error) => {
            console.log(error);
            dispatch({type: "GET_EVENT_ERROR", payload: val});
        })
    }
}