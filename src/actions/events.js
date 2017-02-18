import { createAction } from 'redux-actions';

export const EVENTS_ACTIONS = {
    ADD_EVENT: "ADD_EVENT",
    REMOVE_EVENT: "REMOVE_EVENT",
    UPDATE_EVENT: "UPDATE_EVENT"
};

export const addEvent = createAction(EVENTS_ACTIONS.ADD_EVENT);
export const removeEvent = createAction(EVENTS_ACTIONS.REMOVE_EVENT);
export const updateEvent = createAction(EVENTS_ACTIONS.UPDATE_EVENT);
