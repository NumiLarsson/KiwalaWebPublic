import React, { Component } from 'react';
import { connect } from 'react-redux';
import { } from '../../actions/eventviewer';
import './styles/eventheader.css';

class EventHeader extends Component {
    
    constructor() {
        super();
    }

    componentDidMount(){
        // perform any preparations for an upcoming update
        // Enable loading state
    }

    render() {
        return (
            <div className="event-header">
                <div className="event-header-content">
                    <div className="event-header__title">
                        <h1>{ getEventTitle(this.props.event) }</h1>
                    </div>
                </div>
            </div> 
        )
    }
}

function getEventTitle(event) {
    return (!event) ? "Loading": event.name;
}

//Maps the state in our store to the props property of the Example object.
const mapStateToProps = (state) => {
    return {
        event: state.eventviewer.event
    }
}

//Wrapping the action creators in a dispatch call and allowing us to 
//access them through the props property of the Example object. 
const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(EventHeader);