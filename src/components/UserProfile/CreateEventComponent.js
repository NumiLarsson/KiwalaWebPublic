import React from 'react';
import { browserHistory } from 'react-router';
import './styles/upcomingeventslist.css';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import FacebookImporterComponent from './FacebookImporterComponent';
import './styles/createeventcomponent.css';

const CreateEventComponent = (props) => {
    return (
        <div className="createeventcomp">
            <h1 className="userprofile__header">Create Event</h1>
            <Card>
                <CardTitle title="Create or Import an Event"/>
                <CardActions style={{
                    display: 'flex'
                }}>
                    <FacebookImporterComponent/>
                    <FlatButton label="Create"/>
                </CardActions>
            </Card>
        </div>
    )
}

export default (CreateEventComponent);