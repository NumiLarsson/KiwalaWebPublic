import React, { Component } from 'react';
import User from './../User/User.js'

export default class UserInterface extends Component {
    constructor(user){
        super()
        this.user = user;
    }


    render(){
        const upcomingEvents = this.props.user.upcomingEvents.map( 
            (event) => <li key={event.id}>
                Event: {event.name}, 
                Day: {event.startDate.getDate()}, 
                Month: {event.startDate.getMonth()}
                Year: {event.startDate.getFullYear()}
                </li>
        )

        return(
            <div className="UserInterface">
                <div className="upcomingEvents">
                </div>
            </div>
        );
    }
}