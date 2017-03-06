import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';
//Import custom reducers here.
import eventdata from './eventdata';
import eventmodules from './eventmodules';
import auth from './auth';
import login from "./login";
import userprofile from './userprofile'
import facebookimporter from "./facebookimporter";

const root = combineReducers({eventdata, eventmodules, userprofile, auth, login, facebookimporter, routing: routerReducer, form: formReducer});

export default root;