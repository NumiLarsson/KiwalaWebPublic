import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';
//Import custom reducers here.
import example from './example';
import eventviewer from './eventviewer';
import user from './user'

const root = combineReducers({example, eventviewer, user, routing: routerReducer, form: formReducer});

export default root;