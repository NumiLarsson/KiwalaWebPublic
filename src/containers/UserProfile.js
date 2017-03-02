import React, { Component } from 'react';
import { connect } from 'react-redux';
import UpcomingEventsList from '../components/UserProfile/UpcomingEventsList'
import ProfileSettings from '../components/UserProfile/ProfileSettings'
import { getAcceptedEvents, updateUserProfile } from '../actions/userprofile'
import Spinner from '../components/Utils/Spinner';
import NavigationControl from '../components/Navigation/NavigationControl';
import './styles/userprofile.css';

class UserProfile extends Component {

    constructor() {
        super();
        this.eventListFetched           = false;
        this.loadEventList              = this.loadEventList.bind(this);
        this.handleUserSettingsSaved    = this.handleUserSettingsSaved.bind(this);
    }

    loadEventList() {
        // Only fetch events if there is an user object and we haven't already fetched it.
        // One guard is if it's fetched in reducer and another is for this specific module
        if(this.props.user && !this.props.eventListLoaded && !this.eventListFetched){
            this.eventListFetched = true;
            this.props.getAcceptedEvents(this.props.user.uid);
        }
    }

    handleUserSettingsSaved(values) {
        // Split the values to data
        const userData = {
            displayName: values.profilesettings_name
        };
        this.props.updateUserProfile(this.props.user.uid, userData);
    }

    render() {
        let { user, eventList } = this.props;
        if (!user || !eventList) {
            return (
                <Spinner />
            )
        } else if (!this.props.eventListLoaded) {
            // User is loaded an we will trigger the event load
            this.loadEventList();
            return (
                <Spinner />
            )
        } else {
            return(
                <div className="userprofile">
                    <NavigationControl user={ user } template="userprofile" />
                    <ProfileSettings user={ user } onSubmit={ this.handleUserSettingsSaved } />
                    <UpcomingEventsList user={ user } eventList={ eventList } />
                </div>
            );
        }
    }
}

//Maps the state in our store to the props property of the Example object.
const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        eventList: state.userprofile.eventList,
        eventListLoaded: state.userprofile.eventListLoaded
    }
}

const mapDispatchToProps = {
    getAcceptedEvents,
    updateUserProfile
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);