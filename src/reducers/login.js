import {LOGIN_ACTIONS} from '../actions/login';
const { SET_PASSWORD, SET_PASSWORD2, SET_NAME, SET_EMAIL, TOGGLE_REGISTER, 
    LOGIN_SCREEN_ERROR, RESET_LOGIN_SCREEN_ERROR } = LOGIN_ACTIONS;

const initialState = {
    password: null,
    password2: null,
    name: null,
    email: null,
    register: false,
    error: false,
    errorMessage: ''
}

export default (state = initialState, action) => {
    switch(action.type) {

        case SET_NAME:
            return Object.assign({}, state, {
                name: action.payload
            });
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
        
        case LOGIN_SCREEN_ERROR: 
            return Object.assign({}, state, {
                error : true,
                errorMessage: action.payload
            });
        
        case RESET_LOGIN_SCREEN_ERROR:
            return Object.assign({}, state, {
                error : false,
                errorMessage: action.payload
            });

        case TOGGLE_REGISTER:
            return Object.assign({}, state, {
                register: !state.register
            });

        default:
            return state;
    }
}