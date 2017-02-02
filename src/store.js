/**
 * Script used to set up the redux store.
 */

import { createStore, applyMiddleware } from 'redux'
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux'


//Middleware
import promise from 'redux-promise';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { routerMiddleware } from 'react-router-redux';

//Root reducer
import rootReducer from './reducers/root';


// Set up the middleware that will be used.
const logger = createLogger();
const routerWare = routerMiddleware(browserHistory);
const middleware = [promise, thunk, routerWare];

//Only use logger in development.
if (process.env.NODE_ENV !== 'production') {
  middleware.push(logger);
}

//Create the redux store and apply the middleware.
const store = createStore(
    rootReducer, 
    applyMiddleware(...middleware)
);

//Used to synchronize the router with the store.
export const history = syncHistoryWithStore(browserHistory, store);

export default store;