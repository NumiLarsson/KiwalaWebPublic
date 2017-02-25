import { USER_PROFILE_ACTIONS } from '../actions/actionTypes';

const initialState = {
    eventList: []
}

export default (state = initialState, action) => {
    switch(action.type) {

        case USER_PROFILE_ACTIONS.GET_ACCEPTED_EVENTS:
            if (isNotInEventList(state.eventList, action.payload)) {
                return Object.assign({}, state, {
	            eventList: state.eventList.concat([action.payload])
            });
            } else {
                return state;
            }

        default:
            return state;
    }
}

function isNotInEventList(eventList, payload) {
    let newEventList = eventList;
    console.log(newEventList, "payload: ", payload);
    for (let i = 0; i < newEventList.length; i++ ) {
        if (newEventList[i]['eventId'] === payload['eventId']) {
            return false;
        }
    }
    return true;
}