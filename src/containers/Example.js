import React, { Component } from 'react';
import { connect } from 'react-redux';
import {increaseCounter, updateTitle, updateTitleAsync, loadRandomEvent} from '../actions/example';
import { userLoggedIn, userLoggedOut } from '../actions/auth';
import './styles/example.css';
import api from '../api/Api';

class Example extends Component {
    
    constructor() {
        super();
        this.increaseCounter = this.increaseCounter.bind(this);
        this.changeTitle = this.changeTitle.bind(this);
        this.changeTitleAsync = this.changeTitleAsync.bind(this);
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
        this.props.updateTitleAsync(this.props.title);
    }


    loadRandomEvent() {
        this.props.loadRandomEvent();
    }

    login() {
        api.auth.loginWithEmail("jonas.olander91@gmail.com", "1234567")
        .then(user => {
            console.log(user);
            userLoggedIn(user);
        })
        .catch(error => {
            console.log(error);
        })
    }

    logout() {
        api.auth.logout()
        .then(result => {
            console.log(result);
            userLoggedOut(result);
        })
        .catch(error => {
            console.log(error);
        })
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
        counter: state.example.counter
    }
}

//Wrapping the action creators in a dispatch call and allowing us to 
//access them through the props property of the Example object. 
const mapDispatchToProps = {
    increaseCounter,
    updateTitle,
    updateTitleAsync,
    loadRandomEvent,
    userLoggedIn,
    userLoggedOut
}

export default connect(mapStateToProps, mapDispatchToProps)(Example);