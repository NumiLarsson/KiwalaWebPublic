import React, { Component } from 'react';
import { connect } from 'react-redux';
import './styles/checkbox.css';

class CheckBox extends Component {
    
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.toggleBox = this.toggleBox.bind(this);
        this.renderLabel = this.renderLabel.bind(this);
    }

    componentWillMount() {
        
        if(this.props.checked == true)
            this.setState({checked: true});
        else
            this.setState({checked: false});
    }

    handleChange(event) {
        this.setState({checked: event.target.checked});
    }

    toggleBox() {
        this.setState({checked: !this.state.checked});
    }

    renderLabel() {
        if(this.props.label) {
            return (
                <span onClick={this.toggleBox}>{this.props.label}</span>
            );
        }
        else {
            return (
                null
            );
        }
    }

    render() {
        return (
            <div className={(!this.props.disabled) ? "checkbox-wrapper" : "checkbox-wrapper disabled"}>
                <input type="checkbox" checked={this.state.checked} onChange={this.handleChange}/>
                { this.renderLabel() }
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

export default connect(mapStateToProps, mapDispatchToProps)(CheckBox);