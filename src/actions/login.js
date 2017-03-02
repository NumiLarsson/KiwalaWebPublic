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
import { } from 'react-router-redux';
//get the API
import Api from '../api/Api';
import { push } from 'react-router-redux';

//Constants identifying actions.
export const LOGIN_ACTIONS = {
    SET_NAME : 'SET_NAME',
    SET_EMAIL : 'SET_EMAIL',
    SET_PASSWORD : 'SET_PASSWORD',
    SET_PASSWORD2: 'SET_PASSWORD2',
    TOGGLE_REGISTER: 'TOGGLE_REGISTER',
    LOGIN: 'LOGIN',
    LOGIN_SCREEN_ERROR: 'LOGIN_SCREEN_ERROR', 
    RESET_LOGIN_SCREEN_ERROR: 'RESET_LOGIN_SCREEN_ERROR'
};

//Standard actions.
export const setName = createAction(LOGIN_ACTIONS.SET_NAME);
export const setEmail = createAction(LOGIN_ACTIONS.SET_EMAIL);
export const setPassword = createAction(LOGIN_ACTIONS.SET_PASSWORD);
export const setPassword2 = createAction(LOGIN_ACTIONS.SET_PASSWORD2);
export const toggleRegister = createAction(LOGIN_ACTIONS.TOGGLE_REGISTER);
export const loginScreenError = createAction(LOGIN_ACTIONS.LOGIN_SCREEN_ERROR);
export const resetLoginScreenError = createAction(LOGIN_ACTIONS.RESET_LOGIN_SCREEN_ERROR);

export function logout() {
    return dispatch => {
        return Api.auth.logout();
    }
 }

 export function finishLogin() {
    return dispatch => {
        dispatch(push('/user'));
    }
 }
