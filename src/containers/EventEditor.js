import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getEvent, subscribeToEvent, setCurrentEvent } from '../actions/eventdata';
import { updateEventData, updateEventModuleSettings } from '../actions/eventeditor';
import EventEditorHeader from '../components/EventEditor/EventEditorHeader';
import EventEditorDetails from '../components/EventEditor/EventEditorDetails';
import EventEditorDescription from '../components/EventEditor/EventEditorDescription';
import EventEditorParticipants from '../components/EventEditor/EventEditorParticipants';
import EventEditorControlpanel from '../components/EventEditor/EventEditorControlpanel';
import NavigationControl from '../components/Navigation/NavigationControl';
import Spinner from '../components/Utils/Spinner';
import './styles/eventeditor.css';
import { loadMapImageURL } from './../actions/maps'

class EventEditor extends Component {

    componentWillMount(){
        // perform any preparations for an upcoming update
        // Enable loading state
        this.props.loadMapImageURL();
        // Load event
        const {eventid} = this.props.params;
        this.props.subscribeToEvent(eventid);

        this.handleDetailsModuleSaved       = this.handleDetailsModuleSaved.bind(this);
        this.handleDescriptionModuleSaved   = this.handleDescriptionModuleSaved.bind(this);
        this.handleParticipantsModuleSaved  = this.handleParticipantsModuleSaved.bind(this);
    }

    handleDetailsModuleSaved(values) {
        // Split the values to module
        const moduleSettings = {
            enabled: values.details_enabled,
            showTime: values.details_showTime,
            showLocation: values.details_showLocation,
            showMap: values.details_showMap
        };
        this.props.updateEventModuleSettings(this.props.event.id, 'details', moduleSettings);
    }

    handleDescriptionModuleSaved(values) {
        console.log(values);
        // Split the values to module
        const moduleSettings = {
            enabled: values.description_enabled
        };
        this.props.updateEventModuleSettings(this.props.event.id, 'description', moduleSettings);

        // Split the values to data
        const eventData = {
            description: values.description_data_text
        };
        this.props.updateEventData(this.props.event.id, eventData);
    }

    handleParticipantsModuleSaved(values) {
        console.log(values);
        // Split the values to module
        const moduleSettings = {
            enabled: values.participants_enabled
        };
        this.props.updateEventModuleSettings(this.props.event.id, 'participants', moduleSettings);
    }

    render() {
        if(!this.props.event.loaded && !this.props.modules.loaded) {
            return (
                <Spinner label="" />
            )
        }
        else {
            return (
                <div>
                    <NavigationControl user={this.props.user} eventId={this.props.event.id} template="eventeditor" />
                    <div className="event-editor">

                        <EventEditorHeader headerImage={this.props.event.headerImage} name={this.props.event.name} />

                        <EventEditorControlpanel />

                        <div className="event-content">
                            <div className="event-content__spotlight">
                                <EventEditorDetails onSubmit={this.handleDetailsModuleSaved} form="module-details" />
                                <EventEditorDescription onSubmit={this.handleDescriptionModuleSaved} form="module-description" />
                            </div>
                            <div className="event-content__sideline">
                                <EventEditorParticipants onSubmit={this.handleParticipantsModuleSaved} form="module-participants" />
                            </div>
                        </div>

                    </div>
                </div>
            )
        }
    }
}

//Maps the state in our store to the props property of the Example object.
const mapStateToProps = (state) => {
    return {
        event: state.eventdata,
        modules: state.eventmodules,
        user: state.auth.user
    }
}

//Wrapping the action creators in a dispatch call and allowing us to 
//access them through the props property of the Example object. 
const mapDispatchToProps = {
    getEvent,
    setCurrentEvent,
    subscribeToEvent,
    loadMapImageURL,
    updateEventData,
    updateEventModuleSettings
}

export default connect(mapStateToProps, mapDispatchToProps)(EventEditor);