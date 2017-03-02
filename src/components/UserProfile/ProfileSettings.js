import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import IconButton from '../Utils/IconButtonField';
import './styles/profilesettings.css';


class ProfileSettings extends Component {
    
    render() {
        return (
            <div className="profilesettings">
                <Field name="profilesettings_name" component="input" />
                <Field name="profilesettings_email" component="input" />
                {renderSubmitButton(this.props.pristine)}
            </div>
        )
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
ProfileSettings = reduxForm({
  form: 'profile-settings', // a unique name for this form
  enableReinitialize: true
})(ProfileSettings);

//Maps the state in our store to the props property of the Example object.
const selector = formValueSelector('profile-settings')
const mapStateToProps = (state) => {
    return {
        profilesettings: {
            email: selector(state, 'profilesettings_email'),
            name: selector(state, 'profilesettings_name')
        },
        initialValues : {
            profilesettings_email: state.auth.user.email,
            profilesettings_name: state.auth.user.name
        }
    }
}

//Wrapping the action creators in a dispatch call and allowing us to 
//access them through the props property of the Example object. 
const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSettings);