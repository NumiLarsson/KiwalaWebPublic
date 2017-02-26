import { createAction } from 'redux-actions';
import Api from '../api/Api'; //get the API
import { USER_PROFILE_ACTIONS } from './actionTypes'; //get action types

//Standard actions.
export const fetchFutureEvents = createAction(USER_PROFILE_ACTIONS.GET_ACCEPTED_EVENTS);

export function getAcceptedEvents(uid) {
    return dispatch => {
        Api.user.getAcceptedEvents(uid, events => {
            Object.keys(events).forEach((eventId) => {
                Api.events.subscribeToEventData(eventId, (eventData) => {
                    dispatch(fetchFutureEvents({eventId, eventData}));
                })
            })
        })
    }
}