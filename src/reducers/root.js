import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';
//Import custom reducers here.
import eventdata from './eventdata';
import eventmodules from './eventmodules';
import auth from './auth';
import login from "./login";
import userprofile from './userprofile'

const root = combineReducers({eventdata, eventmodules, userprofile, auth, login, routing: routerReducer, form: formReducer});

export default root;