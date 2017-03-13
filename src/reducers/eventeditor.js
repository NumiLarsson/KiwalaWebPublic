import { EVENT_EDITOR_ACTIONS } from '../actions/actionTypes';
const { EVENT_POLL_EDITOR_OPEN, EVENT_POLL_EDITOR_CLOSE, EVENT_POLL_EDITOR_RESET } = EVENT_EDITOR_ACTIONS;

const initialState = {
    polleditor: {
        loading: false,
        open: false
    }
}

export default (state = initialState, action) => {
    switch(action.type) {

        case EVENT_POLL_EDITOR_RESET:
            return Object.assign({}, state, {
                polleditor: Object.assign({}, state.polleditor, {
                    ...initialState.polleditor
                })
            });

        case EVENT_POLL_EDITOR_OPEN:
            return Object.assign({}, state, {
                polleditor: Object.assign({}, state.polleditor, {
                    open: true 
                })
            });

        case EVENT_POLL_EDITOR_CLOSE:
            return Object.assign({}, state, {
                polleditor: Object.assign({}, state.polleditor, {
                    open: false 
                })
            });

        default:
            return state;
    }
}