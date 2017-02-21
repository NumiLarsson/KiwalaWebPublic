import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';
//Import custom reducers here.
import eventviewer from './eventviewer';
import events from './events'
import auth from './auth';
import login from "./login";

const root = combineReducers({eventviewer, auth, events, login, routing: routerReducer, form: formReducer});

export default root;