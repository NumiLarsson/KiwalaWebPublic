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
export const LOGIN_ACTIONS = {
    SET_EMAIL : 'SET_EMAIL',
    SET_PASSWORD : 'SET_PASSWORD',
    LOGIN: 'LOGIN'
};

//Standard actions.
export const setEmail = createAction(LOGIN_ACTIONS.SET_EMAIL);
export const setPassword = createAction(LOGIN_ACTIONS.SET_PASSWORD);

//Async action. This is what the thunk middleware lets us do.
export function login(provider, email, password) {
    return (dispatch) => {
        switch (provider) {
            case 'facebook':
                return Api.auth.loginWithFacebookPopup();
                break;
            case 'email':
                return Api.auth.loginWithEmail(email, password);
                break;
            default:
                throw new Error('Trying to authenticate with an unknown provider');
        }
    }
}