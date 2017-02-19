export default class EventApi {
  
  
	constructor(database) {
		this.database = database;
		this.subscriptions = {};
	}

	getEvent(eventId) {
	  let self = this;

	  return new Promise((resolve, reject) =>{
		  self.database().ref(`/events/${eventId}`).once('value')
		  .then(snapshot => {
			  let event = snapshot.val();

			  if(event) {
				  resolve(event);
			  } else {
				  reject('No event with that id exists');
			  }
		  })
		  .catch(err => {
			  reject(err);
		  })
	  })
	}


	subscribeToEvent(eventId, callback) {
	let self = this;
	return new Promise((resolve, reject) => {
			self.getEvent(eventId)
			.then(event => {
				let ref = self.database().ref(`/events/${eventId}`)
				ref.on('value', snapshot => {
					callback(snapshot.val());
				});
				this.subscriptions[event] = ref;
				resolve('SUCCESS');
			})
			.catch(err => {
				reject(err);
			})
	});
	}
	// /this.subscriptions[event] = ref;

	attendEvent(eventId, uid) {
	let self = this;
		return new Promise((resolve, reject) => {
	        let updates = {};
	        updates[`/events/${eventId}/participants/${uid}`] = true;
	        self.database().ref().update(updates)
	        .then(() => {
	            resolve('SUCCESS');
	        })
	        .catch(err => {
	            reject(err);
	        });
	    })
	}

	unattendEvent(eventId, uid) {
		let self = this;
		return new Promise((resolve, reject) => {
	        self.database().ref(`/events/${eventId}/participants/${uid}`).set(null)
	        .then(() => {
	            resolve('SUCCESS');
	        })
	        .catch(err => {
	            reject(err);
	        });
	    })
	}

	subscribeToEventList(added, changed, deleted) {
		let ref = this.database().ref('/events');
		ref.on('child_added', (snapshot => {
			added(snapshot.val());
		}));

		ref.on('child_changed', (snapshot => {
			changed(snapshot.val());
		}));

		ref.on('child_removed', (snapshot => {
			deleted(snapshot.val());
		}));

		this.subscriptions['eventList'] = ref;
	}

	/**
	  * Clear all subscriptions.
	*/
    clearSubscriptions() {
        for (var key in this.subscriptions) {
            if (this.subscriptions.hasOwnProperty(key) && this.subscriptions[key]) {
                this.subscriptions[key].off();
                this.subscriptions[key] = null;
            }
        }
    }

}