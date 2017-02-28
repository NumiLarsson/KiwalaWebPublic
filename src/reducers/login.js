import {LOGIN_ACTIONS} from '../actions/login';
const { SET_PASSWORD, SET_PASSWORD2, SET_EMAIL, TOGGLE_REGISTER } = LOGIN_ACTIONS;

const initialState = {
    password: null,
    password2: null,
    email: null,
    register: false
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
        case SET_PASSWORD2:
            return Object.assign({}, state, {
                password2: action.payload
            });
        case TOGGLE_REGISTER:
            return Object.assign({}, state, {
                register: !state.register
            });

        default:
            return state;
    }
}