import Event from '../models/Event';

export default class EventApi {
  getEvent(uuid) {
    return new Promise((resolve, reject) => {
    	var event = new Event(uuid, "Awesome event at camping place", 
    			new Date(), "Stockholm",
    			"This is a description of the awesome event. It will take place in... YOUR PANTS BADUMM-DSHHH!",
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
					},
					eventParticipants:{
						enabled: true,
					}
    			},
                [
                    {name: "Eyeam Smart", avatar: null, id: 1},
                    {name: "Will Udye", avatar: null, id: 2},
                    {name: "Meg Aboot", avatar: null, id: 3},
                    {name: "Eyegot Wood", avatar: null, id: 4},
                    {name: "Fil Mey", avatar: null, id: 5},
                    {name: "Anote Rack", avatar: null, id: 6}
                ]);

    	setTimeout(function() {
        	resolve(event);
        }, 1000);
    });
  }
}