import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
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
      const { handleModuleSaved } = this.props;
      return (
          <form className="eventeditor-header__form" onSubmit={handleModuleSaved}>
            <div className="eventeditor-header" style={ getHeaderImgStyle(this.props.headerImage) }>
                <div className="eventeditor-header__gradient">
                    <div className="eventeditor-header__content">
                    <Field mIcon="save" label="Save" name="eventheaderSave" component={IconButton} />
                        <div className="eventeditor-header__title">
                            <Field className="eventeditor-header__titleField" name="eventheaderName" component="input"/>
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
  form: 'eventheader', // a unique name for this form
  enableReinitialize: true
})(EventEditorHeader);

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
const mapStateToProps = (state) => {
    return {
        headerImage: state.eventdata.headerImage,
        initialValues : {
            eventheaderName: state.eventdata.name
        }
    }
}

//Wrapping the action creators in a dispatch call and allowing us to 
//access them through the props property of the Example object. 
const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(EventEditorHeader);