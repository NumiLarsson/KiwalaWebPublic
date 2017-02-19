import {EVENT_ACTIONS} from '../actions/eventviewer';
import {LOCATION_CHANGE} from "react-router-redux";
const { GET_EVENT, SET_CURRENT_EVENT } = EVENT_ACTIONS;

const initialState = {
    event: null
}

export default (state = initialState, action) => {
    switch(action.type) {

        case LOCATION_CHANGE:

            return Object.assign({}, state, {
                event: action.payload
            });

        default:
            return state;
    }
}