import {EXAMPLE_ACTIONS} from '../actions/example';
const { INCREASE_COUNTER, UPDATE_TITLE } = EXAMPLE_ACTIONS;

const initialState = {
    title: 'Example Title',
    counter: 0
}

export default (state = initialState, action) => {
    switch(action.type) {
        case INCREASE_COUNTER:

            return Object.assign({}, state, {
                counter: state.counter + 1 
            });

        case UPDATE_TITLE:
            return Object.assign({}, state, {
                title: action.payload
            });

        default:
            return state;
    }
}