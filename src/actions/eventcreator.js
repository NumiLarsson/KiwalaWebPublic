/**
 * Actions can be dispatched and caught by reduders.
 * A standard action is defined as an object with a type property and a payload as well as an optional error property.
 * {type: 'example', payload:{counterValue: 10}}
 * Action creators are functions that return actions. It is customary to pass the result of an action creator to
 * the dispatch function like this: dispatch(actionCreator())
 */
//createAction is an action creator used to create standard actions.
import { createAction } from 'redux-actions';

export const CREATE_ACTIONS = {
    SET_TITLE: 'SET_TITLE',
    SET_DESCRIPTION: 'SET_DESCRIPTION',
    SET_START_TIME: 'SET_START_TIME',
    SET_END_TIME: 'SET_END_TIME'
};

export const setTitle = createAction(CREATE_ACTIONS.SET_TITLE);
export const setDescription = createAction(CREATE_ACTIONS.SET_DESCRIPTION);
export const setStartTime = createAction(CREATE_ACTIONS.SET_START_TIME);
export const setEndTime = createAction(CREATE_ACTIONS.SET_END_TIME);