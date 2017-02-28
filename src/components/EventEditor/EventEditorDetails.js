import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { formatDate, formatLocation } from '../../utils/utils';
import IconButton from '../Utils/IconButtonField';
import CheckBox from '../Utils/CheckBoxField';
import './styles/eventeditor_details.css';

class EventEditorDetails extends Component {

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
                            <Field label="Show module" name="details_enabled" component={CheckBox} />
                            { renderSubmitButton(this.props.pristine) }
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

function renderSubmitButton(pristine) {
    if(pristine) {
        return (
            null
        );
    }
    else {
        return (
            <Field className="green" mIcon="save" label="Save" name="details_save" component={IconButton} type="submit" />
        );
    }
}

function renderStartDate(module, startDate) {
    return (
        <div className="eventeditor-details__enabler">
            <Field label="Show date" name="details_showTime" component={CheckBox} />
            <div className="eventeditor-details__item">
                <i className="material-icons color-gray">event</i>
                <Field className="eventeditor-details__item-field" value={ startDate } name="details_data_startDate" component="input" type="date"/>
            </div>
        </div>
    );
}

function renderLocation(module, location) {
    return (
         <div className="eventeditor-details__enabler">
            <Field label="Show location" name="details_showLocation" component={CheckBox} />
            <div className="eventeditor-details__item">
                <i className="material-icons color-gray">location_on</i>
                 <Field className="eventeditor-details__item-field" name="details_data_location" component="input"/>
            </div>
        </div>
    );
}

function renderMap(module, map) {

    return (
        <div className="eventeditor-details__enabler">
            <Field label="Show map" name="details_showMap" component={CheckBox} />
            <div className="eventeditor-details__map">
                <img className="map-image" role="presentation" src={map} />
            </div>
        </div>
    );
}

//Maps the state in our store to the props property of the Example object.
const selector = formValueSelector('module-details')
const mapStateToProps = (state) => {
    return {
        module: {
            enabled: selector(state, 'details_enabled'),
            showTime: selector(state, 'details_showTime'),
            showLocation: selector(state, 'details_showLocation'),
            showMap: selector(state, 'details_showMap')
        },
        startDate: selector(state, 'details_data_startDate'),
        location: selector(state, 'details_data_location'),
        map: state.eventdata.map,
        initialValues : {
            details_enabled: state.eventmodules.details.enabled,
            details_showTime: state.eventmodules.details.showTime,
            details_showLocation: state.eventmodules.details.showLocation,
            details_showMap: state.eventmodules.details.showMap,
            details_data_startDate: formatDate(state.eventdata.startDate),
            details_data_location: state.eventdata.location
        }
    }
}

//Wrapping the action creators in a dispatch call and allowing us to 
//access them through the props property of the Example object. 
const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(EventEditorDetails);