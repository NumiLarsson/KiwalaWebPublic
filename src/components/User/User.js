export default class User {

    acceptedEvents = null

    constructor(id, email, name){
        this.id = id;
        this.email = email;
        this.name = name;
        this.AcceptedEvents = ["EventOne", "EventTwo"]
    }
}