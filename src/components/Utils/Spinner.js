import React, { Component } from 'react';
import { connect } from 'react-redux';
import './styles/spinner.css';

class Spinner extends Component {
    
    constructor() {
        super();
    }

    componentDidMount(){
        // perform any preparations for an upcoming update
        // Enable loading state
    }

    render() {
        return (
            <div>
                <div className="spinner">
                    <div className="spinner-dot1"></div>
                    <div className="spinner-dot2"></div>
                </div>
                {(this.props.label) ? (
                    <span className="spinner-text">{ this.props.label }</span>
                ) : (
                    null
                )
                }
            </div>

        )
    }
}

//Maps the state in our store to the props property of the Example object.
const mapStateToProps = (state) => {
    return {
    }
}

//Wrapping the action creators in a dispatch call and allowing us to 
//access them through the props property of the Example object. 
const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Spinner);