import React, { Component } from 'react';
import { connect } from 'react-redux';
import UpcomingEventsList from '../components/UserInterface/UpcomingEventsList'

class UserInterface extends Component {
    render(){
        return(
            <div className="userinterface">
                <UpcomingEventsList />
            </div>
        );
    }
}

//Maps the state in our store to the props property of the Example object.
const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps)(UserInterface);