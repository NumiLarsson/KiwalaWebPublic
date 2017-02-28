import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import IconButton from '../Utils/IconButtonField';
import './styles/eventeditor_header.css';

class EventEditorHeader extends Component {
    
    constructor() {
        super();

        this.handleNameChange         = this.handleNameChange.bind(this);
    }

    handleNameChange(event) {
        //eventDetailsToggled(event.value.checked);
    }

    render() {
      const { handleSubmit } = this.props;
      return (
          <form className="eventeditor-header__form" onSubmit={handleSubmit}>
            <div className="eventeditor-header" style={ getHeaderImgStyle(this.props.headerImage) }>
                <div className="eventeditor-header__gradient">
                    <div className="eventeditor-header__content">
                    <Field className="eventeditor-header__imageField" name="header_data_image" component="input"/>
                    <div className="eventeditor-header__title">
                        {renderSubmitButton(this.props.pristine)}
                        <Field className="eventeditor-header__titleField" name="header_data_name" component="input"/>
                    </div>
                    </div>
                </div>
            </div> 
          </form>
      )
    }
}

// Decorate the form component
EventEditorHeader = reduxForm({
  form: 'module-header', // a unique name for this form
  enableReinitialize: true
})(EventEditorHeader);

function renderSubmitButton(pristine) {
    if(pristine) {
        return (
            null
        );
    }
    else {
        return (
            <Field className="green eventeditor-header__saveButton" mIcon="save" label="Save" name="eventheaderSave" component={IconButton} />
        );
    }
}

function getHeaderImgStyle(headerImage) {
    return {
      backgroundImage: 'url(' + headerImage + ')',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      overflow: 'hidden',
    };
}

//Maps the state in our store to the props property of the Example object.
const selector = formValueSelector('module-header')
const mapStateToProps = (state) => {
    return {
        headerImage: selector(state, 'header_data_image'),
        initialValues : {
            header_data_name: state.eventdata.name,
            header_data_image: state.eventdata.headerImage
        }
    }
}

//Wrapping the action creators in a dispatch call and allowing us to 
//access them through the props property of the Example object. 
const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(EventEditorHeader);