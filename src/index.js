import React from 'react';
import ReactDOM from 'react-dom';

// Routing and State
import { Provider } from 'react-redux'
import { Router } from 'react-router'
import { listenForAuthChangesAndSubscribeToUser } from './actions/auth';
import store, { history } from './store';
import routes from './routes';

//App imports
import './index.css';

store.dispatch(listenForAuthChangesAndSubscribeToUser());
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();


ReactDOM.render(
 <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('root')
);