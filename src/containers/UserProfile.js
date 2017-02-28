import React, { Component } from 'react';
import { connect } from 'react-redux';
import UpcomingEventsList from '../components/UserInterface/UpcomingEventsList'
import { getAcceptedEvents } from '../actions/userprofile'
import Spinner from '../components/Utils/Spinner';
import NavigationControl from '../components/Navigation/NavigationControl';

class UserProfile extends Component {
    constructor() {
        super();
    }

    componentWillMount() {
    }

    render() {
        let { user, eventList } = this.props;
        if (!user) {
            return (
                <Spinner label="Loading" />
            )
        } else {
            this.props.getAcceptedEvents(this.props.user.uid);
            return(
                <div className="userprofile">
                    <NavigationControl user={ user } template="userprofile" />
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