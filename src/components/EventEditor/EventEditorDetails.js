import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { formatDate, formatLocation } from '../../utils/utils';
import { eventDetailsToggled, eventDetailsTimeToggled, eventDetailsLocToggled, eventDetailsMapToggled } from '../../actions/EventEditor/eventeditor';
import IconButton from '../Utils/IconButton';
import CheckBox from '../Utils/CheckBox';
import './styles/eventeditor_details.css';

class EventEditorDetails extends Component {
    
    constructor() {
        super();

        this.handleDetailsEnabledChange         = this.handleDetailsEnabledChange.bind(this);
        this.handleDetailsTimeEnabledChange     = this.handleDetailsTimeEnabledChange.bind(this);
        this.handleDetailsLocEnabledChange      = this.handleDetailsLocEnabledChange.bind(this);
        this.handleDetailsMapEnabledChange      = this.handleDetailsMapEnabledChange.bind(this);
    }

    handleDetailsEnabledChange(event) {
        eventDetailsToggled(event.value.checked);
    }

    handleDetailsTimeEnabledChange(event) {
        eventDetailsToggled(event.value.checked);
    }

    handleDetailsLocEnabledChange(event) {
        eventDetailsToggled(event.value.checked);
    }

    handleDetailsMapEnabledChange(event) {
        eventDetailsToggled(event.value.checked);
    }

    render() {
        if(this.props.module) {
            const { handleDetailsSubmit } = this.props;
            return (
                <form onSubmit={handleDetailsSubmit}>
                    <div className={(this.props.module.enabled) ? "eventeditor-details" : "eventeditor-details disabled"}>
                        <div className="eventeditor-details__header">
                            <i className="material-icons color-blue">info</i> <span> Details </span>
                        </div>
                        <div className="eventeditor-details__mainenabler">
                            <CheckBox label="Show module" checked={this.props.module.enabled} handleChange={this.handleDetailsEnabledChange} />
                            <IconButton mIcon="save" label="Apply" />
                        </div>
                        { renderStartDate(this.props.module, this.props.startDate, this.handleDetailsTimeEnabledChange) }
                        { renderLocation(this.props.module, this.props.location, this.handleDetailsLocEnabledChange) }
                        { renderMap(this.props.module, this.props.map, this.handleDetailsMapEnabledChange) }
                    </div>
                </form>
            )
        }
        else {
            return (
                null
            )
        }
    }
}

// Decorate the form component
EventEditorDetails = reduxForm({
  form: 'module-details' // a unique name for this form
})(EventEditorDetails);

function renderStartDate(module, startDate, handleChange) {
    return (
        <div className="eventeditor-details__enabler">
            <CheckBox label="Show date" checked={module.showTime} handleChange={handleChange} disabled={!module.enabled} />
            <div className="eventeditor-details__item">
                <i className="material-icons color-gray">event</i>
                <div className="event-details__item-text" title={ formatDate(startDate) }> { formatDate(startDate) } </div>
            </div>
        </div>
    );
}

function renderLocation(module, location, handleChange) {
    return (
         <div className="eventeditor-details__enabler">
            <CheckBox label="Show location" checked={module.showLocation} handleChange={handleChange} disabled={!module.enabled} />
            <div className="eventeditor-details__item">
                <i className="material-icons color-gray">location_on</i>
                <div className="eventeditor-details__item-text" title={ formatLocation(location) }> { formatLocation(location) } </div>
            </div>
        </div>
    );
}

function renderMap(module, map, handleChange) {

    return (
        <div className="eventeditor-details__enabler">
            <CheckBox label="Show map" checked={module.showMap} handleChange={handleChange} disabled={!module.enabled} />
            <div className="eventeditor-details__map">
                <img className="map-image" src={map} />
            </div>
        </div>
    );
}

//Maps the state in our store to the props property of the Example object.
const mapStateToProps = (state) => {
    return {
        module: state.eventdata.event.modules.eventDetails,
    }
}

//Wrapping the action creators in a dispatch call and allowing us to 
//access them through the props property of the Example object. 
const mapDispatchToProps = {
    eventDetailsToggled, 
    eventDetailsTimeToggled, 
    eventDetailsLocToggled, 
    eventDetailsMapToggled
}

export default connect(mapStateToProps, mapDispatchToProps)(EventEditorDetails);