import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';
//Import custom reducers here.
import example from './example';

const root = combineReducers({example, routing: routerReducer, form: formReducer});

export default root;