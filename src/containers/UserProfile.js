import React, { Component } from 'react';
import { connect } from 'react-redux';
import UpcomingEventsList from '../components/UserProfile/UpcomingEventsList'
import ProfileSettings from '../components/UserProfile/ProfileSettings'
import { getAcceptedEvents } from '../actions/userprofile'
import Spinner from '../components/Utils/Spinner';
import NavigationControl from '../components/Navigation/NavigationControl';

class UserProfile extends Component {

    componentWillMount() {
        this.props.getAcceptedEvents(this.props.user.uid);
    }

    render() {
        let { user, eventList } = this.props;
        if (!user || !eventList) {
            return (
                <Spinner />
            )
        } else {
            return(
                <div className="userprofile">
                    <NavigationControl user={ user } template="userprofile" />
                    <ProfileSettings user={ user } />
                    <h2>Eventlist</h2>
                    <UpcomingEventsList user={ user } eventList={ eventList }/>
                </div>
            );
        }
    }
}

//Maps the state in our store to the props property of the Example object.
const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        eventList: state.userprofile.eventList
    }
}

const mapDispatchToProps = {
    getAcceptedEvents
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);