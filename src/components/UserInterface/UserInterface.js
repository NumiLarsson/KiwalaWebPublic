import React, { Component } from 'react';
import User from './../../models/User.js' //Double imports?

export default class UserInterface extends Component {
    constructor(){
        super()
    }


    render(){
        /*const upcomingEvents = this.props.user.upcomingEvents.map( 
            (event) => <li key={event.id}>
                Event: {event.name}, 
                Day: {event.startDate.getDate()}, 
                Month: {event.startDate.getMonth()}
                Year: {event.startDate.getFullYear()}
                </li>
        )*/
        const upcomingEvents = this.props.user.upcomingEvents.map(
            (event) => <li key="1"> {event} </li>
        )
        const username = this.props.user.name;

        return(
            <div className="UserInterface">
                {username}
                <div className="UpcomingEventsList">
                    {upcomingEventsList}
                </div>
            </div>
        );
    }
}