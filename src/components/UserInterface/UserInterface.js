import React, { Component } from 'react';
import User from './../User/User.js'

export default class UserInterface extends Component {
    constructor(user){
        super()
        this.user = user;
    }


    render(){
        return(
            <div className="UserInterface">
                <div className="AcceptedUser">
                </div>
            </div>
        );
    }
}