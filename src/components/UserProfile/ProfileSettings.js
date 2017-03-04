import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import IconButton from '../Utils/IconButtonField';
import './styles/profilesettings.css';

class ProfileSettings extends Component {

    constructor() {
        super();
        this.avatarSelectorOpen         = false;
        this.openAvatarSelector         = this.openAvatarSelector.bind(this);
        this.closeAvatarSelector        = this.closeAvatarSelector.bind(this);
    }

    openAvatarSelector() {
        if(!this.props.standardAvatars) {
            this.props.fetchStandardAvatars();
        }
        this.avatarSelectorOpen = true;
    }

    closeAvatarSelector() {
        this.avatarSelectorOpen = false;
    }
    
    render() {
        const { handleSubmit } = this.props;
        return (
            <form className="profilesettings__form" onSubmit={handleSubmit}>
                <div className="profilesettings">
                    <h1>Profile settings</h1>
                    <div className="profilesettings-window">
                        {renderProfileAvatar(this.props.userData.photoURL, this.openAvatarSelector)}
                        Name:
                        <Field className="profilesettings__input" placeholder="Type here.." name="profilesettings_name" component="input" />
                        {renderSubmitButton(this.props.pristine)}
                    </div>
                </div>
            </form>
        )
    }
}

function renderProfileAvatar(photoURL, onClickFunction){
    if(photoURL) {

        return (
            <div className="profilesettings-avatar" style={ getProfileAvatarStyle(photoURL) } onClick={onClickFunction} >
                <div className="profilesettings-avatar__edit">
                    <i className="material-icons color-gray edit_avatar">edit</i>
                </div>
            </div>
        );
    }
    else {
        return (
            <div className="profilesettings-avatar" onClick={onClickFunction} >
                <i className="material-icons color-gray no_avatar">person</i>
                <i className="material-icons color-gray edit_avatar">edit</i>
            </div>
        );
    }
}

function getProfileAvatarStyle(photoURL) {
    return {
      backgroundImage: 'url(' + photoURL + ')',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      overflow: 'hidden',
    };
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
        user: state.auth.user,
        userData: state.auth.userData,
        standardAvatars: state.userprofile.standardAvatars,
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