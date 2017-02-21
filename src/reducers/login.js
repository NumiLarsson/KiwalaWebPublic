import {LOGIN_ACTIONS} from '../actions/login';
const { SET_PASSWORD, SET_EMAIL } = LOGIN_ACTIONS;

const initialState = {
    password: null,
    email: null
}

export default (state = initialState, action) => {
    switch(action.type) {

        case SET_EMAIL:
            return Object.assign({}, state, {
                email: action.payload
            });
        case SET_PASSWORD:
            return Object.assign({}, state, {
                password: action.payload
            });

        default:
            return state;
    }
}