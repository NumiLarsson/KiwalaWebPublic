/**
 * Contains the routing configuration for the application.
 */
import React from 'react';
import { Route, IndexRoute } from 'react-router';

//Containers to be used as the building blocks of the application.
import App from './containers/app';
import Example from './containers/example';
import EventViewer from './containers/eventviewer';

const routes = (
    <Route path="/" component={App}>
        <IndexRoute component={Example} />
        <Route path="/event:eventid" component={EventViewer}/>
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