import {AUTH_ACTIONS} from '../actions/auth';
const { USER_LOGGED_IN, USER_LOGGED_OUT } = AUTH_ACTIONS;

const initialState = {
    user: null
}

export default (state = initialState, action) => {
    switch(action.type) {

        case USER_LOGGED_IN:

            return Object.assign({}, state, {
                user: action.payload
            });

        case USER_LOGGED_OUT:

            return Object.assign({}, state, {
                user: null
            });

        default:
            return state;
    }
}