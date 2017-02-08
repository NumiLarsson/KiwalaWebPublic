import React, { Component } from 'react';
import User from './../User/User.js'
import AcceptedEvents from './AcceptedEvents/AcceptedEvents.js';

export default class UserInterface extends Component {
    constructor(user){
        super()
        this.user = user;
    }


    render(){
        return(
            <div className="UserInterface">
                <AcceptedEvents user={this.user} />
            </div>
        );
    }
}