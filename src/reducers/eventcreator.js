import {CREATE_ACTIONS} from '../actions/eventcreator';
const {
    SET_TITLE,
    SET_DESCRIPTION,
    SET_START_TIME,
    SET_END_TIME,
} = CREATE_ACTIONS;

const initialState = {
    event: {
        name: '',
        description: '',
        start_time: new Date(),
        end_time: null
    }
}

export default (state = initialState, action) => {
    let event = Object.assign({}, state.event);
    switch (action.type) {

        case SET_START_TIME:
            event.start_time = action.payload;
            return Object.assign({}, state, {
                event: event
            });
        case SET_END_TIME:
            event.end_time = action.payload;
            return Object.assign({}, state, {
                event: event
            });
        case SET_TITLE:
            event.name = action.payload;
            return Object.assign({}, state, {
                event: event
            });
        case SET_DESCRIPTION:
            event.description = action.payload;
            return Object.assign({}, state, {
                event: event
            });

        default:
            return state;
    }
}