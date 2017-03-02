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

export const FACEBOOK_ACTIONS = {
    NEXT_PAGE: 'NEXT_PAGE',
    PREV_PAGE: 'PREV_PAGE',
    OPEN_IMPORTER: 'OPEN_IMPORTER',
    CLOSE_IMPORTER: 'CLOSE_IMPORTER',
    SET_EVENTS: 'SET_EVENTS'
};

export const nextPage = createAction(FACEBOOK_ACTIONS.NEXT_PAGE);
export const previousPage = createAction(FACEBOOK_ACTIONS.PREV_PAGE);
export const openImporter = createAction(FACEBOOK_ACTIONS.OPEN_IMPORTER);
export const closeImporter = createAction(FACEBOOK_ACTIONS.CLOSE_IMPORTER);
export const setEvents = createAction(FACEBOOK_ACTIONS.SET_EVENTS);