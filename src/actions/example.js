/**
 * Actions can be dispatched and caught by reduders. 
 * A standard action is defined as an object with a type property and a payload as well as an optional error property.
 * {type: 'example', payload:{counterValue: 10}}
 * Action creators are functions that return actions. It is customary to pass the result of an action creator to
 * the dispatch function like this: dispatch(actionCreator())
 */
//createAction is an action creator used to create standard actions.
import { createAction } from 'redux-actions';
//push can be used to navigate. dispatch(push('path'))
import { push } from 'react-router-redux';

//Constants identifying actions.
export const EXAMPLE_ACTIONS = {
    INCREASE_COUNTER : 'INCREASE_COUNTER',
    UPDATE_TITLE: 'UPDATE_TITLE',
    UPDATE_TITLE_ASYNC: 'UPDATE_TITLE_ASYNC'
};

//Standard actions.
export const increaseCounter = createAction(EXAMPLE_ACTIONS.INCREASE_COUNTER);
export const updateTitle = createAction(EXAMPLE_ACTIONS.UPDATE_TITLE);

//Async action. This is what the thunk middleware lets us do.
export function updateTitleAsync(val) {
    return (dispatch) => {
        randomAsyncFunction(val)
        .then((val) => {
            dispatch(updateTitle('Correct'))
        })
        .catch((error) => {
            dispatch(updateTitle('Nah ah'));
        })
    }
}

function randomAsyncFunction(val) {
    return new Promise((resolve, reject) => {
        if (val.length > 10) {
            resolve(val);
        }
        reject(val)
    })
}