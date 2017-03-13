import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getEvent, subscribeToEvent, setCurrentEvent, removePollFromEvent } from '../actions/eventdata';
import { updateEventData, updateEventModuleSettings, createPollForEvent } from '../actions/eventeditor';
import EventEditorPolls from '../components/EventEditor/EventEditorPolls';
import EventEditorHeader from '../components/EventEditor/EventEditorHeader';
import EventEditorDetails from '../components/EventEditor/EventEditorDetails';
import EventEditorDescription from '../components/EventEditor/EventEditorDescription';
import EventEditorParticipants from '../components/EventEditor/EventEditorParticipants';
import EventEditorControlpanel from '../components/EventEditor/EventEditorControlpanel';
import NavigationControl from '../components/Navigation/NavigationControl';
import Spinner from '../components/Utils/Spinner';
import './styles/eventeditor.css';
import { formatDateUnix } from './../utils/utils';
import { loadMapImageURL } from './../actions/maps'

class EventEditor extends Component {

    componentWillMount(){
        // perform any preparations for an upcoming update
        // Enable loading state
        this.props.loadMapImageURL();
        // Load event
        const {eventid} = this.props.params;
        this.props.subscribeToEvent(eventid);

        this.handleHeaderSettingsSaved      = this.handleHeaderSettingsSaved.bind(this);
        this.handleDetailsModuleSaved       = this.handleDetailsModuleSaved.bind(this);
        this.handleDescriptionModuleSaved   = this.handleDescriptionModuleSaved.bind(this);
        this.handleParticipantsModuleSaved  = this.handleParticipantsModuleSaved.bind(this);
        this.handlePollsModuleSaved         = this.handlePollsModuleSaved.bind(this);
        this.handlePollsModalSaved          = this.handlePollsModalSaved.bind(this);
        this.handleRemovePoll               = this.handleRemovePoll.bind(this);
    }

    handleHeaderSettingsSaved(values) {
        // Split the values to data
        const eventData = {
            name: values.header_data_name,
            headerImage: values.header_data_image
        };
        this.props.updateEventData(this.props.event.id, eventData);
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

        // Split the values to data
        const eventData = {
            startDate: formatDateUnix(values.details_data_startDate),
            location: values.details_data_location
        };
        this.props.updateEventData(this.props.event.id, eventData);
    }

    handleDescriptionModuleSaved(values) {
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
        // Split the values to module
        const moduleSettings = {
            enabled: values.participants_enabled
        };
        this.props.updateEventModuleSettings(this.props.event.id, 'participants', moduleSettings);
    }

    handlePollsModuleSaved(values) {
        // Split the values to module
        const moduleSettings = {
            enabled: values.polls_enabled
        };
        this.props.updateEventModuleSettings(this.props.event.id, 'polls', moduleSettings);
    }

    handlePollsModalSaved(values) {
        // Split the values to module
        const pollSettings = {
            active: values.poll_active,
            question: values.poll_question,
            choices: values.poll_choices
        };
        
        this.props.createPollForEvent(this.props.event.id, pollSettings);
    }

    handleRemovePoll(pollId) {
        this.props.removePollFromEvent(this.props.event.id, pollId);
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

                        <EventEditorHeader onSubmit={this.handleHeaderSettingsSaved} />

                        <EventEditorControlpanel handlePollsModalSaved={this.handlePollsModalSaved} />

                        <div className="event-content">
                            <div className="event-content__spotlight">
                                <EventEditorPolls onSubmit={this.handlePollsModuleSaved} removePoll={this.handleRemovePoll} />
                                <EventEditorDetails onSubmit={this.handleDetailsModuleSaved} />
                                <EventEditorDescription onSubmit={this.handleDescriptionModuleSaved} />
                            </div>
                            <div className="event-content__sideline">
                                <EventEditorParticipants onSubmit={this.handleParticipantsModuleSaved} />
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
    updateEventModuleSettings,
    createPollForEvent,
    removePollFromEvent
}

export default connect(mapStateToProps, mapDispatchToProps)(EventEditor);