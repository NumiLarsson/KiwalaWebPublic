import React, { Component } from 'react';
import { connect } from 'react-redux';
import { } from '../../actions/eventviewer';
import './styles/eventdescription.css';

class EventDescription extends Component {
    
    constructor() {
        super();
    }

    componentDidMount(){
        // perform any preparations for an upcoming update
        // Enable loading state
    }

    render() {
        return (
            <div className="event-description">
                <i className="material-icons color-dark-gray">description</i> <span> Description </span>
                <p> { this.props.event.description } </p>
            </div> 
        )
    }
}

//Maps the state in our store to the props property of the Example object.
const mapStateToProps = (state) => {
    return {
        event: state.eventviewer.event
    }
}

//Wrapping the action creators in a dispatch call and allowing us to s
//access them through the props property of the Example object. 
const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(EventDescription);