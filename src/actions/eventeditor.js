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
import {  } from 'react-router-redux';
//get the API
import Api from '../api/Api';

//get action types
import { EVENT_EDITOR_ACTIONS } from './actionTypes';

//Standard actions.
export const eventDataUpdated   = createAction(EVENT_EDITOR_ACTIONS.EVENT_DATA_UPDATED);
export const eventModuleUpdated = createAction(EVENT_EDITOR_ACTIONS.EVENT_MODULE_DATA_UPDATED);
export const openPollEditor     = createAction(EVENT_EDITOR_ACTIONS.EVENT_POLL_EDITOR_OPEN);
export const closePollEditor    = createAction(EVENT_EDITOR_ACTIONS.EVENT_POLL_EDITOR_CLOSE);


/**
 * Update event data.
 * @param {string} eventId - The id of the event.
 * @param {object} dataUpdates - Object mapping the name of the data field to the new value.
 * @example updateEventData(2. {description: 'New event description'})
*/
export function updateEventData(eventId, dataUpdates) {
    return dispatch => {
        Api.events.updateEventData(eventId, dataUpdates)
        .then(res => {
            dispatch(eventDataUpdated(res));
        })
        .catch(err => {
            console.log(err);
        })
    }
}

/**
 * Update the settings for an event module.
 * @param {string} eventId - The id of the event.
 * @param {string} module - The name/id of the module.
 * @param {object} settings - The values to be saved.
 */
export function updateEventModuleSettings(eventId, module, settings) {
    return dispatch => {
        Api.events.updateEventModuleSettings(eventId, module, settings)
        .then(res => {
            dispatch(eventModuleUpdated(res));
        })
        .catch(err => {
            console.log(err);
        })
    }
}