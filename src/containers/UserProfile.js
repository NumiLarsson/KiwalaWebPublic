import React, { Component } from 'react';
import { connect } from 'react-redux';
import UpcomingEventsList from '../components/UserProfile/UpcomingEventsList'
import ProfileSettings from '../components/UserProfile/ProfileSettings'
import { getAcceptedEvents, updateUserProfile, fetchStandardAvatars, setAvatarSelectorOpen } from '../actions/userprofile'
import Spinner from '../components/Utils/Spinner';
import NavigationControl from '../components/Navigation/NavigationControl';
import CreateEventComponent from '../components/UserProfile/CreateEventComponent';
import './styles/userprofile.css';
import Api from '../api/Api'; //get the API

class UserProfile extends Component {

    constructor() {
        super();
        this.eventListRequested         = false;
        this.handleUserSettingsSaved    = this.handleUserSettingsSaved.bind(this);
    }

    componentWillUpdate() {
        if(this.props.user && !this.eventListRequested) {
            this.eventListRequested = true;
            this.props.getAcceptedEvents(this.props.user.uid);
        }
    }

    handleUserSettingsSaved(values) {
        // Split the values to data
        const userData = {
            displayName: values.profilesettings_name,
            photoURL: values.profilesettings_avatar
        };
        this.props.updateUserProfile(this.props.user.uid, userData);
    }

    isUserUsingFacebook() {
        return Api.auth.isUsingFacebook();
    }

    render() {
        let { user, userData, eventList } = this.props;
        if (!user || !userData || !eventList) {
            return (
                <Spinner />
            )
        } else {
            // User is loaded an we will trigger the event load
            return(
                <div className="userprofile">
                    <NavigationControl user={ user } template="userprofile" />
                    <ProfileSettings user={ user } onSubmit={ this.handleUserSettingsSaved } fetchStandardAvatars={this.props.fetchStandardAvatars} setAvatarSelectorOpen={this.props.setAvatarSelectorOpen} />
                    <div className="userprofile__items">
                        <CreateEventComponent isUsingFacebook={this.isUserUsingFacebook()} />
                        <UpcomingEventsList user={ user } eventList={ eventList } eventListLoaded={this.props.eventListLoaded}/>
                    </div>
                </div>
            );
        }
    }
}

//Maps the state in our store to the props property of the Example object.
const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        userData: state.auth.userData,
        eventList: state.userprofile.eventList,
        eventListLoaded : state.userprofile.eventListLoaded
    }
}

const mapDispatchToProps = {
    getAcceptedEvents,
    updateUserProfile,
    fetchStandardAvatars,
    setAvatarSelectorOpen
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);