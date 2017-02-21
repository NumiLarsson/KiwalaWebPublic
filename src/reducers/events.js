import {EVENTS_ACTIONS} from '../actions/events';
import Event from '../models/Event';

const testEvent1 = new Event(1, "Awesome event at camping place", 
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

const testEvent2 = new Event(2, "Awesome event at camping place", 
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
                    {name: "Hello World", avatar: null, id: 1},
                    {name: "Will Udye", avatar: null, id: 2},
                    {name: "Meg Aboot", avatar: null, id: 3},
                    {name: "Eyegot Wood", avatar: null, id: 4},
                    {name: "Fil Mey", avatar: null, id: 5},
                    {name: "Anote Rack", avatar: null, id: 6}
                ]);  

const initialState = {
    events: [testEvent1, testEvent2]
}

export default (state = initialState, action) => {
    switch(action.type) {
        case EVENTS_ACTIONS.ADD_EVENT:
            return Object.assign({}, state, {
                ...action.payload
            });
        case EVENTS_ACTIONS.REMOVE_EVENT:
            return Object.assign({}, state, {
                ...action.payload
            });
        case EVENTS_ACTIONS.UPDATE_EVENT:
            return Object.assign({}, state, {
                ...action.payload
            });
        default:
            return state;
    }
}