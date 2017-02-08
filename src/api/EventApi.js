import Event from '../models/Event';

export default class EventApi {
  getEvent(uuid) {
    return new Promise((resolve, reject) => {
    	var event = new Event(uuid, "Awesome event at camping place", 
    			new Date(), "This is a description of the awesome event. It will take place in... YOUR PANTS BADUMM-DSHHH!",
    			{
    				headerDetails:{
    					enabled: true,
						showTime: true, 
						showLocation: true
					},
    				eventDetails:{
    					enabled: true,
    					showTime: true,
    					showLocation: true,
    					showMap: true
					},
					eventDescription:{
						enabled: true,
					}


    			});

    	setTimeout(function() {
        	resolve(event);
        }, 1000);
    });
  }
}