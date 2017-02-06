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
        var sectionStyle = {
          backgroundImage: 'url(images/' + this.props.event.headerImg + ')',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          overflow: 'hidden',
        };

        return (
            <div className="event-header" style={ sectionStyle }>
                <div className="event-header__gradient">
                    <div className="event-header__content">
                        <div className="event-header__title">
                            <h1>{ this.props.event.name }</h1>
                        </div>
                        <div className="event-header__info">
                           <i className="material-icons color-white">event</i> <span>{ translateEventDate(this.props.event) }</span>
                        </div>
                    </div>
                </div>
            </div> 
        )
    }
}

function translateEventDate(event) {
    if(!event.startDate) {
        return (
            "No date specified"
        );
    }
    else {
        return (
            event.startDate
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(EventHeader);