import React, { Component } from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import { Field, reduxForm, formValueSelector, change } from 'redux-form';
import UserAvatarSelector from './UserAvatarSelector';
import './styles/profilesettings.css';

class ProfileSettings extends Component {

    constructor() {
        super();
        this.openAvatarSelector         = this.openAvatarSelector.bind(this);
        this.closeAvatarSelector        = this.closeAvatarSelector.bind(this);
        this.setNewAvatar               = this.setNewAvatar.bind(this);
    }

    openAvatarSelector() {
        this.props.setAvatarSelectorOpen(true);
        if(!this.props.standardAvatars) {
            this.props.fetchStandardAvatars();
        }
    }

    closeAvatarSelector(event) {
        this.props.setAvatarSelectorOpen(false);
    }

    setNewAvatar(avatar) {
        //Set new avatar
        this.props.changeFieldValue('profilesettings_avatar', avatar);
        //Close selector
        this.props.setAvatarSelectorOpen(false);
    }
    
    render() {
        const { handleSubmit } = this.props;
        return (
            <form className="profilesettings__form" onSubmit={handleSubmit}>
                <div className="profilesettings">
                    <h1 className="userprofile__header">Profile settings</h1>
                    <div className="profilesettings-window">
                        {renderProfileAvatar(this.props.profilesettings.photoURL, this.openAvatarSelector)}
                        { (this.props.avatarSelectorOpen) ?
                            <UserAvatarSelector avatarList={this.props.standardAvatars} handleChosenAvatar={this.setNewAvatar} handleClose={this.closeAvatarSelector} />
                            :
                            null
                        }
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
                <div className="profilesettings-avatar__edit">
                    <i className="material-icons color-gray edit_avatar">edit</i>
                </div>
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
            <Field label="Save" name="description_save" 
                component={RaisedButton} icon={<FontIcon className="material-icons">save</FontIcon>} 
                backgroundColor="#689F38" labelColor="#fff" type="submit" />
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
        avatarSelectorOpen: state.userprofile.avatarSelectorOpen,
        profilesettings: {
            name: selector(state, 'profilesettings_name'),
            photoURL: selector(state, 'profilesettings_avatar')
        },
        initialValues : {
            profilesettings_name: state.auth.userData.displayName,
            profilesettings_avatar : state.auth.userData.photoURL
        }
    }
}

//Wrapping the action creators in a dispatch call and allowing us to 
//access them through the props property of the Example object. 
const mapDispatchToProps = function(dispatch) {
    return {
        // This will be passed as a property to the presentational component
        changeFieldValue: function(field, value) {
            dispatch(change('profile-settings', field, value))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSettings);