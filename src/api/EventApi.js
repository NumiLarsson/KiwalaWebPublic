import Event from '../models/Event';

export default class EventApi {
  getEvent(uuid) {
    return new Promise((resolve, reject) => {
    	var event = new Event(eventid, "Awesome Event", null, "This is a description of the awesome event. It will take place in... YOUR PANTS BADUMM-DSHHH!");

    	etTimeout(function() {
        	resolve(event);
        }, 1000);
    });
  }
}