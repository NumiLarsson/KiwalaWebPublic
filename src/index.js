import React from 'react';
import ReactDOM from 'react-dom';

// Routing and State
import { Provider } from 'react-redux'
import { Router } from 'react-router'
import store, { history } from './store';
import routes from './routes';

//App imports
import './index.css';

ReactDOM.render(
 <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('root')
);