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

export const FACEBOOK_ACTIONS = {
    SET_PAGE: 'SET_PAGE',
    OPEN_IMPORTER: 'OPEN_IMPORTER',
    CLOSE_IMPORTER: 'CLOSE_IMPORTER',
    SET_EVENTS: 'SET_EVENTS',
    SELECT_EVENT: 'SELECT_EVENT',
    SET_START_TIME: 'SET_START_TIME',
    SET_END_TIME: 'SET_END_TIME',
    EVENT_CREATION_INITIATED: 'EVENT_CREATION_INITIATED',
    EVENT_CREATION_FINISHED: 'EVENT_CREATION_FINISHED'
};

export const setPage = createAction(FACEBOOK_ACTIONS.SET_PAGE);
export const openImporter = createAction(FACEBOOK_ACTIONS.OPEN_IMPORTER);
export const closeImporter = createAction(FACEBOOK_ACTIONS.CLOSE_IMPORTER);
export const setEvents = createAction(FACEBOOK_ACTIONS.SET_EVENTS);
export const selectEvent = createAction(FACEBOOK_ACTIONS.SELECT_EVENT);
export const setSelectedEventStartTime = createAction(FACEBOOK_ACTIONS.SET_START_TIME);
export const setSelectedEventEndTime = createAction(FACEBOOK_ACTIONS.SET_END_TIME);
export const eventCreationInitiated = createAction(FACEBOOK_ACTIONS.EVENT_CREATION_INITIATED);
export const eventCreationFinished = createAction(FACEBOOK_ACTIONS.EVENT_CREATION_FINISHED);