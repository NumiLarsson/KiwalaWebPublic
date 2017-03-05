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

//Constants identifying actions.
export const AUTH_ACTIONS = {
    USER_LOGGED_IN : 'USER_LOGGED_IN',
    USER_LOGGED_OUT : 'USER_LOGGED_OUT',
    SET_CURRENT_USER_DATA : 'SET_CURRENT_USER_DATA'
};

//Standard actions.
export const userLoggedIn           = createAction(AUTH_ACTIONS.USER_LOGGED_IN);
export const userLoggedOut          = createAction(AUTH_ACTIONS.USER_LOGGED_OUT);
export const setCurrentUserData     = createAction(AUTH_ACTIONS.SET_CURRENT_USER_DATA);

export function listenForAuthChangesAndSubscribeToUser() {
    return (dispatch, getState) => {
        Api.auth.listenForAuthChanges(
            (user) => {
                dispatch(userLoggedIn(user));
                Api.user.createUserIfNotExists(user);

                Api.user.clearSubscriptions();

                Api.user.subscribeToUserData(user.uid, (user) => {
                    dispatch(setCurrentUserData(user));
                });

            }, //Success
            () => {
                dispatch(userLoggedOut());
            }
        );
    };
}

export function subscribeToUser(userId){
    return dispatch => {
        Api.user.clearSubscriptions();

        Api.user.subscribeToUserData(userId, (user) => {
            dispatch(setCurrentUserData(user));
        });
    }
}