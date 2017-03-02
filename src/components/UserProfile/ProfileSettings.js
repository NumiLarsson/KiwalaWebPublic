import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import IconButton from '../Utils/IconButtonField';
import './styles/profilesettings.css';

class ProfileSettings extends Component {
    
    render() {
        const { handleSubmit } = this.props;
        return (
            <form className="profilesettings__form" onSubmit={handleSubmit}>
                <div className="profilesettings">
                    <h2>Profile settings</h2>
                    <div className="profilesettings-window">
                        Name:
                        <Field className="profilesettings__input" placeholder="Type here.." name="profilesettings_name" component="input" />
                        {renderSubmitButton(this.props.pristine)}
                    </div>
                </div>
            </form>
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
            name: selector(state, 'profilesettings_name')
        },
        initialValues : {
            profilesettings_name: state.auth.userData.displayName
        }
    }
}

//Wrapping the action creators in a dispatch call and allowing us to 
//access them through the props property of the Example object. 
const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSettings);