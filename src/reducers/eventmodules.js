import { EVENT_ACTIONS } from '../actions/actionTypes';
const { SET_CURRENT_EVENT_MODULES } = EVENT_ACTIONS;

const initialState = {
    loaded: null, 
    description: {
        enabled: true
    },
    details: {
        enabled: false,
        showTime: false,
        showLocation: false,
        showMap: false
    },
    participants: {
        enabled: false
    }
}

export default (state = initialState, action) => {
    switch(action.type) {

        case SET_CURRENT_EVENT_MODULES:

            return Object.assign({}, state, {
                ...action.payload,
                loaded: true
            });
        default:
            return state;
    }
}