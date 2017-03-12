import React from 'react';
import {Card, CardActions/*, CardTitle, CardText*/} from 'material-ui/Card';
import FacebookImporterComponent from './FacebookImporterComponent';
import CreateEventModal from './CreateEventModal';
import './styles/createeventcomponent.css';

const CreateEventComponent = (props) => {
    return (
        <div className="createeventcomp">
            <h1 className="userprofile__header">Create Event</h1>
            <Card className="createeventcomp-card">
                <CardActions style={{
                    display: 'flex'
                }}>
                { (props.isUsingFacebook) ?
                    <FacebookImporterComponent/>
                    :
                    null
                }
                    <CreateEventModal/>
                </CardActions>
            </Card>
        </div>
    )
}

export default (CreateEventComponent);