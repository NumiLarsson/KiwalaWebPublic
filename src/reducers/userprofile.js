import { USER_PROFILE_ACTIONS } from '../actions/actionTypes';

const initialState = {
    eventList: [],
    eventListLoaded: false,
    standardAvatars : null,
    avatarSelectorOpen: false
}

export default (state = initialState, action) => {
    switch(action.type) {

        case USER_PROFILE_ACTIONS.NO_EVENT_IN_LIST:
            return Object.assign({}, state, {
                eventListLoaded: true
            });

        case USER_PROFILE_ACTIONS.GET_ACCEPTED_EVENTS_DATA:
            return addOrChangeData(state, action.payload);

        case USER_PROFILE_ACTIONS.GET_ACCEPTED_EVENTS_MODULES:
            return addOrChangeModules(state, action.payload);

        case USER_PROFILE_ACTIONS.STANDARD_AVATARS_RECIEVED:
            return Object.assign({}, state, {
                standardAvatars: action.payload
            });

        case USER_PROFILE_ACTIONS.TOGGLE_AVATAR_SELECTOR:
            return Object.assign({}, state, {
                avatarSelectorOpen: action.payload
            });

        default:
            return state;
    }
}

/** 
https://egghead.io/lessons/javascript-redux-avoiding-array-mutations-with-concat-slice-and-spread
**/

function addOrChangeData(state, payload) {
    for (let i = 0; i < state.eventList.length; i++ ) {
        if (state.eventList[i]['eventId'] === payload['eventId']) {
            // Overwrite the data
            let tempArr = state.eventList[i];
            tempArr['eventData'] = payload.eventData;
            return Object.assign({}, state, {
                eventList: state.eventList
                    .slice(0, i)
                    .concat(tempArr)
                    .concat(state.eventList.slice(i + 1)),
                eventListLoaded: true
            });
        }
    }
    // Add, does not exist
    return Object.assign({}, state, {
        eventList: state.eventList.concat([payload]),
        eventListLoaded: true
    });
}

function addOrChangeModules(state, payload) {
    for (let i = 0; i < state.eventList.length; i++ ) {
        if (state.eventList[i]['eventId'] === payload['eventId']) {
            // Overwrite the data
            let tempArr = state.eventList[i];
            tempArr['eventModules'] = payload.eventModules;
            //state.eventList[i] = payload;
            return Object.assign({}, state, {
                eventList: state.eventList
                    .slice(0, i)
                    .concat(tempArr)
                    .concat(state.eventList.slice(i + 1)),
                eventListLoaded: true
            });
        }
    }
    // Add, does not exist
    return Object.assign({}, state, {
        eventList: state.eventList.concat([payload]),
        eventListLoaded: true
    });
}