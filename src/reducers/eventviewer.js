import {EVENT_ACTIONS} from '../actions/eventviewer';
import { MAPS_ACTIONS } from '../actions/maps';
import {LOCATION_CHANGE} from "react-router-redux";
const { GET_EVENT, SET_CURRENT_EVENT } = EVENT_ACTIONS;

const initialState = {
    event: null,
    map: null
}

export default (state = initialState, action) => {
    switch(action.type) {

        case LOCATION_CHANGE:

            return Object.assign({}, state, {
                event: action.payload
            });
        case MAPS_ACTIONS.MAP_IMAGE_URL: 
            return Object.assign({}, state, {
                map: action.payload
            })
        default:
            return state;
    }
}