import React, { Component } from 'react';
import { connect } from 'react-redux';
import IconButton from '../Utils/IconButton';
import CheckBox from '../Utils/CheckBox';
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
            return (
                <div className="eventeditor-description">
                    <div className="eventeditor-description__header">
                        <i className="material-icons color-blue">description</i> <span> Description </span>
                    </div>
                    <div className="eventeditor-description__mainenabler">
                        <CheckBox label="Show module" name="descriptionEnabled" checked={this.props.module.enabled} />
                        <IconButton mIcon="save" label="Apply" />
                    </div>
                    <p> { this.props.description } </p>
                </div> 
            )
        }
        else {
            return (
                null
            )
        }
    }
    
}

//Maps the state in our store to the props property of the Example object.
const mapStateToProps = (state) => {
    return {
        module: state.eventmodules.details,
        description: state.eventdata.data.description,
        initialValues : {
            //detailsEnabled: state.eventmodules.details.enabled
        }
    }
}

//Wrapping the action creators in a dispatch call and allowing us to 
//access them through the props property of the Example object. 
const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(EventEditorDescription);