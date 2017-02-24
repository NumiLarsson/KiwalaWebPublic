import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import IconButton from '../Utils/IconButtonField';
import CheckBox from '../Utils/CheckBoxField';
import './styles/eventeditor_description.css';

class EventEditorDescription extends Component {
    
    constructor() {
        super();

        this.handleDescriptionEnabledChange     = this.handleDescriptionEnabledChange.bind(this);
        this.handleDescriptionChange            = this.handleDescriptionChange.bind(this);
    }

    handleDescriptionEnabledChange(event) {
        //eventDetailsToggled(event.value.checked);
    }

    handleDescriptionChange(event) {
        //eventDetailsToggled(event.value.checked);
    }

    render() {
        if(this.props.module) {
            const { handleModuleSaved } = this.props;
            return (
                <form onSubmit={handleModuleSaved}>
                    <div className={(this.props.module.enabled) ? "eventeditor-description" : "eventeditor-description disabled"}>
                        <div className="eventeditor-description__header">
                            <i className="material-icons color-blue">description</i> <span> Description </span>
                        </div>
                        <div className="eventeditor-description__mainenabler">
                            <Field label="Show module" name="descriptionEnabled" component={CheckBox} />
                            <Field mIcon="save" label="Save" name="descriptionSave" component={IconButton} />
                        </div>
                        <Field className="event-description__description" name="descriptionText" component="textarea"/>
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
EventEditorDescription = reduxForm({
  form: 'moduledescription', // a unique name for this form
  enableReinitialize: true
})(EventEditorDescription);

//Maps the state in our store to the props property of the Example object.
const mapStateToProps = (state) => {
    return {

        module: state.eventmodules.details,
        initialValues : {
            descriptionEnabled: state.eventmodules.description.enabled,
            descriptionText: state.eventdata.description
        }
    }
}

//Wrapping the action creators in a dispatch call and allowing us to 
//access them through the props property of the Example object. 
const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(EventEditorDescription);