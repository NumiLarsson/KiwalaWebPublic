import {FACEBOOK_ACTIONS} from '../actions/facebookimporter';
const { PREV_PAGE, NEXT_PAGE, OPEN_IMPORTER, CLOSE_IMPORTER, SET_EVENTS } = FACEBOOK_ACTIONS;

const initialState = {
    page: 0,
    active: false,
    events: []
}

export default (state = initialState, action) => {
    switch(action.type) {

        case NEXT_PAGE:
            return Object.assign({}, state, {
                page: state.page + 1
            });
        case PREV_PAGE:
            return Object.assign({}, state, {
                page: state.page === 0 ? 0 : state.page -1
            });
        case OPEN_IMPORTER:
            return Object.assign({}, state, {
                active: true
            });
        case CLOSE_IMPORTER:
            return Object.assign({}, state, {
                active: false
            });
        case SET_EVENTS:
            return Object.assign({}, state, {
                events: action.payload
            });

        default:
            return state;
    }
}