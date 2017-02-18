import React, { Component } from 'react';
import { connect } from 'react-redux';
import {increaseCounter, updateTitle, updateTitleAsync, loadRandomEvent} from '../actions/example';
import './styles/example.css';
import User from './../models/User.js';
import UserInterface from './../components/UserInterface/UserInterface.js';
import api from '../api/Api';
import { createUser } from './../actions/user'
import { addEvent, removeEvent, updateEvent } from './../actions/events'
import { push } from 'react-router-redux';
import { Link } from 'react-router';

class Example extends Component {
    
    constructor() {
        super();
        this.increaseCounter = this.increaseCounter.bind(this);
        this.changeTitle = this.changeTitle.bind(this);
        this.changeTitleAsync = this.changeTitleAsync.bind(this);
        this.user = new User(1, "Spam", "Anton");
        this.loadRandomEvent = this.loadRandomEvent.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    increaseCounter() {
        this.props.increaseCounter();
    }

    changeTitle(event) {
        //The value passed to the function will be the payload value of the action.
        this.props.updateTitle(event.target.value);
    }

    changeTitleAsync() {
        this.props.createUser(this.user)
    }


    loadRandomEvent() {
        this.props.loadRandomEvent();
    }

    login() {
        api.auth.loginWithEmail("jonas.olander91@gmail.com", "1234567")
        .then(user => {
            console.log(user);
            this.user.update(user);
        })
        .catch(error => {
            console.log(error);
        })
    }

    logout() {
        api.auth.logout()
        .then(result => {
            console.log(result);
        })
        .catch(error => {
            console.log(error);
        })
    }

    formatEvents(events) {
        const formattedEvents = events.map( 
            (event) => 
                <li key={event.id}>
                    <Link to={`/event:${event.id}`}>
                        {event.name}
                    </Link>
                </li>
        )
        return formattedEvents
    }

    render() {
        let {title, counter, loadRandomEvent,
             increaseCounter, changeTitleAsync, name, events} = this.props;
        return (
            <div className="example">
                <h1>This is the example container</h1>
                <h2>Title: {title} </h2>
                <h2>Counter: {counter} </h2>
                <button onClick={loadRandomEvent}>Load random event</button>
                <br/>
                <button onClick={increaseCounter}>Increase counter</button>
                <label htmlFor="title">Type in the field to change the title.</label> 
                <input name="title" type="text" value={title} onChange={this.changeTitle} />
                <button onClick={changeTitleAsync}>Update title async</button>

                <div className="Test">
                    {name}
                    {this.formatEvents(events)}
                </div>

                <button onClick={this.login}>Login</button>
                <button onClick={this.logout}>Logout</button>
            </div>
        )
    }
}

//Maps the state in our store to the props property of the Example object.
const mapStateToProps = (state) => {
    return {
        title: state.example.title,
        counter: state.example.counter,
        name: state.user.name,
        events: state.events.events
    }
}

//Wrapping the action creators in a dispatch call and allowing us to 
//access them through the props property of the Example object. 
const mapDispatchToProps = {
    increaseCounter,
    updateTitle,
    updateTitleAsync,
    loadRandomEvent,
    createUser,
    addEvent,
    removeEvent,
    updateEvent
}

export default connect(mapStateToProps, mapDispatchToProps)(Example);