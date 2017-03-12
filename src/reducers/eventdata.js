import { EVENT_ACTIONS } from '../actions/actionTypes';
import { MAPS_ACTIONS } from '../actions/maps';
const { SET_CURRENT_EVENT, SET_CURRENT_EVENT_DATA, SET_CURRENT_EVENT_PARTICIPANTS, UPDATE_CURRENT_EVENT_PARTICIPANTS_USERS, SET_EVENT_ADMIN_PRIVILEGES, SET_EVENT_POLL, SET_EVENT_POLL_ANSWERS } = EVENT_ACTIONS;

const initialState = {
    id: null,
    name: null,
    participants: null,
    polls: null,
    loaded: null, 
    map: null,
    description: "",
    startDate: null,
    location: null,
    headerImage: null,
    adminLevel: 0 
}

export default (state = initialState, action) => {
    switch(action.type) {

        case SET_CURRENT_EVENT:
            const {id, name} = action.payload;
            return Object.assign({}, state, {
                id,
                name,
                loaded: true
            });

        case SET_CURRENT_EVENT_DATA:

            return Object.assign({}, state, {
                ...action.payload
            });

        case SET_CURRENT_EVENT_PARTICIPANTS:

            // Filter out all the participants in state that's not in the payload!
            // in order to remove unattenting participants
            let newParticipants = {};
            Object.keys(action.payload).forEach(function(key) {
                if(state.participants && state.participants[key])
                    newParticipants[key] = state.participants[key];
            });

            return Object.assign({}, state, {
                participants: newParticipants
            });

        case UPDATE_CURRENT_EVENT_PARTICIPANTS_USERS:
            let uid = action.payload.uid;
            return Object.assign({}, state, {
                participants: Object.assign({}, state.participants, {
                    [uid]: action.payload
                })
            });

        case SET_EVENT_POLL:
            let pollID = action.payload.id;
            return Object.assign({}, state, {
                polls: Object.assign({}, state.polls, {
                    [pollID]: action.payload
                })
            });

        case SET_EVENT_POLL_ANSWERS:
            let userId = action.payload.uid;
            let pollId = action.payload.pollId;
            return Object.assign({}, state, {
                polls: Object.assign({}, state.polls, {
                    [pollId]: Object.assign({}, state.polls[pollId], {
                        answers: Object.assign({}, state.polls[pollId].answers, {
                            [userId]: action.payload.val
                        })
                    })
                })
            });

        case SET_EVENT_ADMIN_PRIVILEGES:
            return Object.assign({}, state, {
                adminLevel: action.payload
            });

        case MAPS_ACTIONS.MAP_IMAGE_URL: 
            return Object.assign({}, state, {
                map: action.payload
            });
        default:
            return state;
    }
}