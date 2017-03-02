import React from 'react';
import { browserHistory } from 'react-router';
import './styles/upcomingeventslist.css';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import FacebookImporterComponent from './FacebookImporterComponent';

const CreateEventComponent = (props) => {
    return (
        <Card>
            <CardTitle title="Create or Import an Event"/>
            <CardActions style={{
                display: 'flex'
            }}>
                <FacebookImporterComponent/>
                <FlatButton label="Create"/>
            </CardActions>
        </Card>
    )
}

export default (CreateEventComponent);