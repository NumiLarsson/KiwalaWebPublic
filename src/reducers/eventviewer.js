import {EVENT_ACTIONS} from '../actions/eventviewer';
const { GET_EVENT, SET_CURRENT_EVENT } = EVENT_ACTIONS;

const initialState = {
    event: null
    /*{
		description : null,
		headerImg : null,
		id : null,
		location : null,
		modules : {
		  eventDescription : {
		    enabled : false
		  },
		  eventDetails : {
		    enabled : false,
		    showLocation : null,
		    showMap : null,
		    showTime : null
		  },
		  eventParticipants : {
		    enabled : false
		  },
		  headerDetails : {
		    enabled : false,
		    showLocation : null,
		    showTime : null
		  }
		},
		name : null,
		participants : null,
		startDate : null
	}*/
}

export default (state = initialState, action) => {
    switch(action.type) {

        case SET_CURRENT_EVENT:

            return Object.assign({}, state, {
                event: action.payload
            });

        default:
            return state;
    }
}