import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { formatDate, formatLocation } from '../../utils/utils';
import IconButton from '../Utils/IconButtonField';
import CheckBox from '../Utils/CheckBoxField';
import './styles/eventeditor_details.css';

class EventEditorDetails extends Component {
    
    constructor() {
        super();
    }

    render() {
        if(this.props.module) {
            const { handleSubmit } = this.props;
            return (
                <form onSubmit={handleSubmit}>
                    <div className={(this.props.module.enabled) ? "eventeditor-details" : "eventeditor-details disabled"}>
                        <div className="eventeditor-details__header">
                            <i className="material-icons color-blue">info</i> <span> Details </span>
                        </div>
                        <div className="eventeditor-details__mainenabler">
                            <Field label="Show module" name="enabled" component={CheckBox} />
                            <Field mIcon="save" label="Save" name="detailsSave" component={IconButton} type="submit" /> 
                        </div>
                        { renderStartDate(this.props.module, this.props.startDate) }
                        { renderLocation(this.props.module, this.props.location) }
                        { renderMap(this.props.module, this.props.map) }
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
    form: 'module-details', // a unique name for this form
    enableReinitialize: true
})(EventEditorDetails);



function renderStartDate(module, startDate) {
    return (
        <div className="eventeditor-details__enabler">
            <Field label="Show date" name="showTime" component={CheckBox} />
            <div className="eventeditor-details__item">
                <i className="material-icons color-gray">event</i>
                <div className="event-details__item-text" title={ formatDate(startDate) }> { formatDate(startDate) } </div>
            </div>
        </div>
    );
}

function renderLocation(module, location) {
    return (
         <div className="eventeditor-details__enabler">
            <Field label="Show location" name="showLocation" component={CheckBox} />
            <div className="eventeditor-details__item">
                <i className="material-icons color-gray">location_on</i>
                <div className="eventeditor-details__item-text" title={ formatLocation(location) }> { formatLocation(location) } </div>
            </div>
        </div>
    );
}

function renderMap(module, map) {

    return (
        <div className="eventeditor-details__enabler">
            <Field label="Show map" name="showMap" component={CheckBox} />
            <div className="eventeditor-details__map">
                <img className="map-image" role="presentation" src={map} />
            </div>
        </div>
    );
}

//Maps the state in our store to the props property of the Example object.
const mapStateToProps = (state) => {
    return {
        module: state.eventmodules.details,
        startDate: state.eventdata.startDate,
        location: state.eventdata.location,
        map: state.eventdata.map,
        initialValues : {
            enabled: state.eventmodules.details.enabled,
            showTime: state.eventmodules.details.showTime,
            showLocation: state.eventmodules.details.showLocation,
            showMap: state.eventmodules.details.showMap
        }
    }
}

//Wrapping the action creators in a dispatch call and allowing us to 
//access them through the props property of the Example object. 
const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(EventEditorDetails);