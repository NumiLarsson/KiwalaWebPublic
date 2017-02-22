/**
 * Contains the routing configuration for the application.
 */
import React from 'react';
import { Route, IndexRoute } from 'react-router';

//Containers to be used as the building blocks of the application.
import App from './containers/App';
import SplashScreen from './containers/SplashScreen';
import EventViewer from './containers/EventViewer';
import UserInterface from './containers/UserInterface';
import Login from "./containers/Login";
import Api from './api/Api';

// Taken from https://github.com/ReactTraining/react-router/blob/master/examples/auth-flow/app.js
function requireAuth(nextState, replace) {
    if (! Api.auth.loggedIn()) {
        replace({
            pathname: '/login',
            state: {nextPathname: nextState.location.pathname}
        })
    }
}

const routes = (
    <Route path="/" component={App}>
        <IndexRoute component={SplashScreen} />
        <Route path="/event/:eventid" component={EventViewer}/>
        <Route path="/login" component={Login} />
        <Route path="/user/:userid" component={UserInterface}/>
    </Route>
);

export default routes;


/** Example of slightly more complex routing.

    <Route path="/" component={App}>
        <IndexRoute component={SplashScreen}/>
        <Route path="/login" component={LoginScreen}/>
        <Route path="/main" component={MainScreen} onEnter={someFunction}>
            <Route path="/user:userid" component={UserDetails} />
        </Route>
    </Route>
 */