import {USER_ACTIONS} from '../actions/user';

const initialState = {
    name: "Guest",
    id: 0,
    email: "",
    upcomingEvents: []
}

export default (state = initialState, action) => {
    switch(action.type) {
        case USER_ACTIONS.CREATE_USER:
            return Object.assign({}, state, {
                ...action.payload
            });
        default:
            return state;
    }
}