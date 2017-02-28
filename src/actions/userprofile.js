import { createAction } from 'redux-actions';
import Api from '../api/Api'; //get the API
import { USER_PROFILE_ACTIONS } from './actionTypes'; //get action types

//Standard actions.
export const fetchFutureEventsData 		= createAction(USER_PROFILE_ACTIONS.GET_ACCEPTED_EVENTS_DATA);
export const fetchFutureEventsModules 	= createAction(USER_PROFILE_ACTIONS.GET_ACCEPTED_EVENTS_MODULES);

export function getAcceptedEvents(uid) {
    return dispatch => {
        Api.user.getAcceptedEvents(uid, events => {
            Object.keys(events).forEach((eventId) => {
                Api.events.subscribeToEventData(eventId, (eventData) => {
                    dispatch(fetchFutureEventsData({eventId, eventData}));
                })
                Api.events.subscribeToEventModules(eventId, (eventModules) => {
                    dispatch(fetchFutureEventsModules({eventId, eventModules}));
                })
            })
        })
    }
}