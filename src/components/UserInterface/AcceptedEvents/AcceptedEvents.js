import React, { Component } from 'react';
import './../../User/User.js';

export default class AcceptedEvents extends Component {
    constructor(user) {
        super()
    }

    renderEvents() {
        let items = []
        this.props.user.acceptedEvents.forEach((item) => {
            items.push(<li>item</li>)
        })
        return items
    }

    render() {
        return (
            <div className="AcceptedEvents">
                <ul>
                    <p> Hello World </p>
                    {this.renderEvents()}
                </ul>
            </div>
        )
    }
}