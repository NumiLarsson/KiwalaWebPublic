import { Event } from './event';

class Api {
  
  constructor() {
  	if (! Api.instance) {
        Api.instance = this;
    }

    return Api.instance;
  }

  getEvent(eventid) {
  	return new Promise((resolve, reject) => {
  		var event = new Event(eventid, "Awesome Event", null, "This is a description of the awesome event. It will take place in... YOUR PANTS BADUMM-DSHHH!")
        if (event == null) {
        	reject(null);
        }
        resolve(event);
    })
  }
}

const api = new Api();
Object.freeze(api);

export default api;