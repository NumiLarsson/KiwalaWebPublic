import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import IconButton from '../Utils/IconButtonField';
import CheckBox from '../Utils/CheckBoxField';
import './styles/eventeditor_description.css';

class EventEditorDescription extends Component {
    
    render() {
        if(this.props.module) {
            const { handleSubmit } = this.props;
            return (
                <form onSubmit={handleSubmit}>
                    <div className={(this.props.module.enabled) ? "eventeditor-description" : "eventeditor-description disabled"}>
                        <div className="eventeditor-description__header">
                            <i className="material-icons color-blue">description</i> <span> Description </span>
                        </div>
                        <div className="eventeditor-description__mainenabler">
                            <Field label="Show module" name="description_enabled" component={CheckBox} />
                            { renderSubmitButton(this.props.pristine) }
                        </div>
                        <Field className="event-description__description" name="description_data_text" component="textarea"/>
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

function renderSubmitButton(pristine) {
    if(pristine) {
        return (
            null
        );
    }
    else {
        return (
            <Field className="green" mIcon="save" label="Save" name="description_save" component={IconButton} type="submit" />
        );
    }
}

// Decorate the form component
EventEditorDescription = reduxForm({
  form: 'module-description', // a unique name for this form
  enableReinitialize: true
})(EventEditorDescription);

//Maps the state in our store to the props property of the Example object.
const selector = formValueSelector('module-description')
const mapStateToProps = (state) => {
    return {
        module: {
            enabled: selector(state, 'description_enabled')
        },
        initialValues : {
            description_enabled: state.eventmodules.description.enabled,
            description_data_text: state.eventdata.description
        }
    }
}

//Wrapping the action creators in a dispatch call and allowing us to 
//access them through the props property of the Example object. 
const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(EventEditorDescription);