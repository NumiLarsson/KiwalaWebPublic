/**
 * Actions can be dispatched and caught by reduders.
 * A standard action is defined as an object with a type property and a payload as well as an optional error property.
 * {type: 'example', payload:{counterValue: 10}}
 * Action creators are functions that return actions. It is customary to pass the result of an action creator to
 * the dispatch function like this: dispatch(actionCreator())
 */
//createAction is an action creator used to create standard actions.
import { createAction } from 'redux-actions';

export const MODAL_ACTIONS = {
    SET_PAGE: 'SET_PAGE',
    OPEN_MODAL: 'OPEN_MODAL',
    CLOSE_MODAL: 'CLOSE_MODAL',
    EVENT_CREATION_INITIATED: 'EVENT_CREATION_INITIATED',
    EVENT_CREATION_FINISHED: 'EVENT_CREATION_FINISHED'
};

export const setPage = createAction(MODAL_ACTIONS.SET_PAGE);
export const openModal = createAction(MODAL_ACTIONS.OPEN_MODAL);
export const closeModal = createAction(MODAL_ACTIONS.CLOSE_MODAL);
export const eventCreationInitiated = createAction(MODAL_ACTIONS.EVENT_CREATION_INITIATED);
export const eventCreationFinished = createAction(MODAL_ACTIONS.EVENT_CREATION_FINISHED);