import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formatDate, formatLocation } from '../../utils/utils';
import './styles/eventeditor_header.css';

class EventEditorHeader extends Component {
    
    constructor() {
        super();

        this.handleNameChange         = this.handleNameChange.bind(this);
    }

    handleNameChange(event) {
        //eventDetailsToggled(event.value.checked);
    }

    render() {
      return (
          <div className="eventeditor-header" style={ getHeaderImgStyle(this.props.headerImage) }>
              <div className="eventeditor-header__gradient">
                  <div className="eventeditor-header__content">
                      <div className="eventeditor-header__title">
                          <h1>{ this.props.name }</h1>
                      </div>
                  </div>
              </div>
          </div> 
      )
    }
    
}

function getHeaderImgStyle(headerImage) {
    return {
      backgroundImage: 'url(' + headerImage + ')',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      overflow: 'hidden',
    };
}

//Maps the state in our store to the props property of the Example object.
const mapStateToProps = (state) => {
    return {
        headerImage: state.eventdata.headerImage,
        name: state.eventdata.name
    }
}

//Wrapping the action creators in a dispatch call and allowing us to 
//access them through the props property of the Example object. 
const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(EventEditorHeader);