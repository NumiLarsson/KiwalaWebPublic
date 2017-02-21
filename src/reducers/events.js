import {EVENTS_ACTIONS} from '../actions/events';
import Event from '../models/Event';

const initialState = {
    events: []
}

export default (state = initialState, action) => {
    switch(action.type) {
        case EVENTS_ACTIONS.ADD_EVENT:
            return Object.assign({}, state, {
                ...action.payload
            });
        case EVENTS_ACTIONS.REMOVE_EVENT:
            return Object.assign({}, state, {
                ...action.payload
            });
        case EVENTS_ACTIONS.UPDATE_EVENT:
            return Object.assign({}, state, {
                ...action.payload
            });
        default:
            return state;
    }
}