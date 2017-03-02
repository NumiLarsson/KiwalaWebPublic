/**
 * Contains the routing configuration for the application.
 */
import React from 'react';
import { Route, IndexRoute } from 'react-router';

//Containers to be used as the building blocks of the application.
import App from './containers/App';
import SplashScreen from './containers/SplashScreen';
import EventViewer from './containers/EventViewer';
import UserProfile from './containers/UserProfile';
import EventEditor from './containers/EventEditor';
import Login from "./components/Login/Login";
import Api from './api/Api'; //get the API

const requireAuth = (nextState, replace, callback) => {

    if (Api.auth.getCurrentUser()) {
        callback();
    } else {
        replace('/');
        callback();
    }
}

const routes = (
    <Route path="/" component={App}>
        <IndexRoute component={SplashScreen} />
        <Route path="/event/:eventid" component={EventViewer} />
        <Route path="/login" component={Login} />
        <Route path="/user" component={UserProfile}  />
        <Route path="eventsettings/:eventid" component={EventEditor} />
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