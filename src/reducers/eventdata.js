import { EVENT_ACTIONS } from '../actions/actionTypes';
import { MAPS_ACTIONS } from '../actions/maps';
const { SET_CURRENT_EVENT, SET_CURRENT_EVENT_DATA, SET_CURRENT_EVENT_PARTICIPANTS, UPDATE_CURRENT_EVENT_PARTICIPANTS_USERS } = EVENT_ACTIONS;

const initialState = {
    id: null,
    name: null,
    participants: null,
    loaded: null, 
    map: null,
    description: "",
    startDate: null,
    location: null,
    headerImage: null
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
            for(var i = 0; i < action.payload.length; i++){
                var k = action.payload[i];
                if(state.participants && state.participants[k])
                    newParticipants[k] = state.participants[k];
            }

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

        case MAPS_ACTIONS.MAP_IMAGE_URL: 
            return Object.assign({}, state, {
                map: action.payload
            });
        default:
            return state;
    }
}