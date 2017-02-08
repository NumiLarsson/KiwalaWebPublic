import React, { Component } from 'react';
import { connect } from 'react-redux';
import {increaseCounter, updateTitle, updateTitleAsync, loadRandomEvent} from '../actions/example';
import './styles/example.css';
import User from './../components/User/User.js';
import UserInterface from './../components/UserInterface/UserInterface.js';

class Example extends Component {
    
    constructor() {
        super();
        this.increaseCounter = this.increaseCounter.bind(this);
        this.changeTitle = this.changeTitle.bind(this);
        this.changeTitleAsync = this.changeTitleAsync.bind(this);
        this.user = new User(1, "Spam", "Anton");
        this.loadRandomEvent = this.loadRandomEvent.bind(this);
    }

    increaseCounter() {
        this.props.increaseCounter();
    }

    changeTitle(event) {
        //The value passed to the function will be the payload value of the action.
        this.props.updateTitle(event.target.value);
    }

    changeTitleAsync() {
        this.props.updateTitleAsync(this.props.title);
    }

    loadRandomEvent() {
        this.props.loadRandomEvent();
    }

    render() {
        return (
            <div className="example">
                <h1>This is the example container</h1>
                <h2>Title: {this.props.title} </h2>
                <h2>Counter: {this.props.counter} </h2>
                <button onClick={this.loadRandomEvent}>Load random event</button>
                <br/>
                <button onClick={this.increaseCounter}>Increase counter</button>
                <label htmlFor="title">Type in the field to change the title.</label> 
                <input name="title" type="text" value={this.props.title} onChange={this.changeTitle} />
                <button onClick={this.changeTitleAsync}>Update title async</button>
                <div className="UI">
                    <UserInterface user={this.user} />
                </div>
            </div>
        )
    }
}

//Maps the state in our store to the props property of the Example object.
const mapStateToProps = (state) => {
    return {
        title: state.example.title,
        counter: state.example.counter
    }
}

//Wrapping the action creators in a dispatch call and allowing us to 
//access them through the props property of the Example object. 
const mapDispatchToProps = {
    increaseCounter,
    updateTitle,
    updateTitleAsync,
    loadRandomEvent
}

export default connect(mapStateToProps, mapDispatchToProps)(Example);