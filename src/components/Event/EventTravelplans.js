import React, { Component } from 'react';
import { connect } from 'react-redux';
//import './styles/eventcontrolpanel.css';

class EventTravelplans extends Component {
    
    constructor() {
        super();
    }

    formatLocations(locations) {
        return (
            locations.map( (location) => {
                <li key={location}> {location} </li>
            })
        );
    }

    componentDidMount(){
        // perform any preparations for an upcoming update
        // Enable loading state
    }

    render() {

        let { locations } = this.props.event;

        if (locations) {
            let renderLocations = this.formatLocations(locations);
            return (
                <div> <ul> renderLocations </ul> </div>
            );
        } else {
            return null;
        }
    }
}

//Maps the state in our store to the props property of the Example object.
const mapStateToProps = (state) => {
    return {
        event: state.eventdata,
        user: state.auth.user
    }
}

//Wrapping the action creators in a dispatch call and allowing us to 
//access them through the props property of the Example object. 
const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(EventTravelplans);