import { createAction } from 'redux-actions';
import Api from '../api/Api'; //get the API
import { USER_PROFILE_ACTIONS } from './actionTypes'; //get action types

//Standard actions.
export const fetchFutureEventsData 		= createAction(USER_PROFILE_ACTIONS.GET_ACCEPTED_EVENTS_DATA);
export const fetchFutureEventsModules 	= createAction(USER_PROFILE_ACTIONS.GET_ACCEPTED_EVENTS_MODULES);
export const userProfileUpdated         = createAction(USER_PROFILE_ACTIONS.USER_PROFILE_UPDATED);
export const standardAvatarsRecieved    = createAction(USER_PROFILE_ACTIONS.STANDARD_AVATARS_RECIEVED);
export const setAvatarSelectorOpen      = createAction(USER_PROFILE_ACTIONS.TOGGLE_AVATAR_SELECTOR);

export function getAcceptedEvents(uid) {
    return dispatch => {
        Api.user.getAcceptedEvents(uid, events => {
            if (events) {
                Object.keys(events).forEach((eventId) => {
                    Api.events.subscribeToEventData(eventId, (eventData) => {
                        dispatch(fetchFutureEventsData({eventId, eventData}));
                    })
                    Api.events.subscribeToEventModules(eventId, (eventModules) => {
                        dispatch(fetchFutureEventsModules({eventId, eventModules}));
                    })
                })
            }
        })
    }
}

/**
 * Update user data.
 * @param {string} eventId - The id of the user.
 * @param {object} dataUpdates - Object mapping the name of the data field to the new value.
 * @example updateUserProfile(2. {displayName: 'NewName Lool'})
*/
export function updateUserProfile(userId, dataUpdates) {
    return dispatch => {
        // User object in firebase
        //Api.auth.updateUserProfile(Api.auth.getCurrentUser(), dataUpdates)
        // User object in DB
        Api.user.updateUserProfile(userId, dataUpdates)
        .then(res => {
            // User object in DB
            dispatch(userProfileUpdated(res));
        })
        .catch(err => {
            console.log(err);
        })
    }
}

/**
 * Fetches the standard avatars
*/
export function fetchStandardAvatars() {
    return dispatch => {
        // User object in firebase
        //Api.auth.updateUserProfile(Api.auth.getCurrentUser(), dataUpdates)
        // User object in DB
        Api.user.fetchStandardAvatars()
        .then(res => {
            // User object in DB
            dispatch(standardAvatarsRecieved(res));
        })
        .catch(err => {
            console.log(err);
        })
    }
}