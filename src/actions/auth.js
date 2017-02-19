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
export const AUTH_ACTIONS = {
    USER_LOGGED_IN : 'USER_LOGGED_IN',
    USER_LOGGED_OUT : 'USER_LOGGED_OUT',
};

//Standard actions.
export const userLoggedIn = createAction(AUTH_ACTIONS.USER_LOGGED_IN);
export const userLoggedOut = createAction(AUTH_ACTIONS.USER_LOGGED_OUT);

//Async action. This is what the thunk middleware lets us do.
export function loginWithEmail(email, password) {
    return dispatch => {
        Api.auth.loginWithEmail(email, password)
        .then((user) => {
            dispatch(userLoggedIn(user))
        })
        .catch((error) => {
            console.log(error);
            //dispatch({type: "GET_EVENT_ERROR", payload: eventId});
        })
    }
}

export function logout(eventId, uid) {
    return dispatch => {
        Api.events.logout()
        .then(res => {
            dispatch(userLoggedOut(res));
        })
        .catch(err => {
            console.log(err);
        })
    }
}