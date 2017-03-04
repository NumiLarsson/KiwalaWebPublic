import {AUTH_ACTIONS} from '../actions/auth';
const { USER_LOGGED_IN, USER_LOGGED_OUT, SET_CURRENT_USER_DATA } = AUTH_ACTIONS;

const initialState = {
    user: null,
    userData: null
}

export default (state = initialState, action) => {
    switch(action.type) {

        case USER_LOGGED_IN:

            return Object.assign({}, state, {
                user: action.payload
            });

        case USER_LOGGED_OUT:

            return Object.assign({}, state, {
                user: null,
                userData: null
            });

        case SET_CURRENT_USER_DATA:
            return Object.assign({}, state, {
                userData: action.payload
            });

        default:
            return state;
    }
}