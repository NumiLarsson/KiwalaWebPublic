import {EVENT_ACTIONS} from '../actions/eventviewer';
const { GET_EVENT, SET_CURRENT_EVENT } = EVENT_ACTIONS;

const initialState = {
    event: null
}

export default (state = initialState, action) => {
    switch(action.type) {

        case SET_CURRENT_EVENT:

            return Object.assign({}, state, {
                event: action.payload
            });

        default:
            return state;
    }
}