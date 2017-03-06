import {FACEBOOK_ACTIONS} from '../actions/facebookimporter';
const {
    SET_PAGE,
    PREV_PAGE,
    NEXT_PAGE,
    OPEN_IMPORTER,
    CLOSE_IMPORTER,
    SET_EVENTS,
    SELECT_EVENT,
    SET_START_TIME,
    SET_END_TIME,
    EVENT_CREATION_INITIATED,
    EVENT_CREATION_FINISHED
} = FACEBOOK_ACTIONS;

const initialState = {
    page: 0,
    loading: false,
    active: false,
    events: [],
    selectedEvent: {
        id: null,
        event: {
            start_time: null,
            end_time: null
        }
    }
}

export default (state = initialState, action) => {
    switch (action.type) {

        case SET_PAGE:
            return Object.assign({}, state, {
                page: action.payload
            });
        case OPEN_IMPORTER:
            return Object.assign({}, state, {
                active: true
            });
        case CLOSE_IMPORTER:
            return Object.assign({}, state, {
                active: false
            });
        case SET_EVENTS:
            return Object.assign({}, state, {
                events: action.payload
            });
        case SELECT_EVENT:
            return Object.assign({}, state, {
                selectedEvent: action.payload
            });
        case SET_START_TIME:
            let newStartEvent = Object.assign({}, state.selectedEvent);
            newStartEvent.event.start_time = action.payload;
            return Object.assign({}, state, {
                selectedEvent: newStartEvent
            });
        case SET_END_TIME:
            let newEndEvent = Object.assign({}, state.selectedEvent);
            newEndEvent.event.end_time = action.payload;
            return Object.assign({}, state, {
                selectedEvent: newEndEvent
            });
        case EVENT_CREATION_INITIATED:
            return Object.assign({}, state, {
                loading: true
            });
        case EVENT_CREATION_FINISHED:
            return Object.assign({}, state, {
                loading: false
            });

        default:
            return state;
    }
}