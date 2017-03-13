import {MODAL_ACTIONS} from '../actions/createEventModal';
const {
    SET_PAGE,
    OPEN_MODAL,
    CLOSE_MODAL,
    EVENT_CREATION_INITIATED,
    EVENT_CREATION_FINISHED
} = MODAL_ACTIONS;

const initialState = {
    page: 0,
    loading: false,
    active: false
}

export default (state = initialState, action) => {
    switch (action.type) {

        case SET_PAGE:
            return Object.assign({}, state, {
                page: action.payload
            });
        case OPEN_MODAL:
            return Object.assign({}, state, {
                active: true
            });
        case CLOSE_MODAL:
            return Object.assign({}, state, {
                active: false
            });
        case EVENT_CREATION_INITIATED:
            return Object.assign({}, state, {
                loading: true
            });
        case EVENT_CREATION_FINISHED:
            return Object.assign({}, state, {
                loading: false
            });

        default:
            return state;
    }
}