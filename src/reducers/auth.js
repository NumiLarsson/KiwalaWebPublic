import {AUTH_ACTIONS} from '../actions/auth';
import { USER_PROFILE_ACTIONS } from '../actions/actionTypes'; //get action types
const { USER_LOGGED_IN, USER_LOGGED_OUT, SET_CURRENT_USER_DATA } = AUTH_ACTIONS;
const { USER_PROFILE_UPDATED } = USER_PROFILE_ACTIONS;

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
                userData: Object.assign({}, state.userData, {
                    ...action.payload
                })
            });

        case USER_PROFILE_UPDATED:
            return Object.assign({}, state, {
                userData: Object.assign({}, state.userData, {
                    ...action.payload
                })
            });

        default:
            return state;
    }
}