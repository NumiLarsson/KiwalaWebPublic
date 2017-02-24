export default class EventApi {
  
  
	constructor(database) {
		this.database = database;
		this.subscriptions = {};
	}

	/**
	 * Get an event.
	 * @param {string} eventId - The id of the event.
	 * @returns A Promise which resolves to an event object.
 	 */
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

	/**
	 * Subsribe to changes to an event.
	 * @param {string} eventId - The id of the event.
	 * @param {function} callback - Callback function which is called with the updated event object.
 	 */
	subscribeToEvent(eventId, callback) {
	  let ref = this.database().ref(`/events/${eventId}`)
		ref.on('value', snapshot => {
			callback(snapshot.val());
		});
		this.subscriptions[`event_${eventId}`] = ref;
	}
	
	/**
	 * Get the data for an event
	 * @param {string} eventId - The id of the event.
	 * @returns A Promise which resolves to an eventData object
 	 */
	getEventData(eventId) {
		let self = this;
		return new Promise((resolve, reject) =>{
			self.database().ref(`/eventData/${eventId}`).once('value')
			.then(snapshot => {
				let eventData = snapshot.val();

				if(eventData) {
					resolve(eventData);
				} else {
					reject('No data exists for that event');
				}
			})
			.catch(err => {
				reject(err);
			})
		})
	}

	/**
	 * Subsribe to changes to eventData.
	 * @param {string} eventId - The id of the event.
	 * @param {function} callback - Callback function which is called with the updated eventData object.
 	 */
	subscribeToEventData(eventId, callback) {
		let ref = this.database().ref(`/eventData/${eventId}`);
		ref.on('value', snapshot => {
				callback(snapshot.val());
		});
		this.subscriptions[`eventData_${eventId}`] = ref;
	}

	/**
	 * Get the module settings for an event.
	 * @param {string} eventId - The id of the event.
	 * @return Promise which resolve to an eventModules object and reject with an error.
 	 */
	getEventModules(eventId) {
		let self = this;
		return new Promise((resolve, reject) =>{
			self.database().ref(`/eventModules/${eventId}`).once('value')
			.then(snapshot => {
				let eventModules = snapshot.val();

				if(eventModules) {
					resolve(eventModules);
				} else {
					reject('No modules exists for that event');
				}
			})
			.catch(err => {
				reject(err);
			})
		})
	}

	/**
	 * Subsribe to changes to the modules of an event.
	 * @param {string} eventId - The id of the event.
	 * @param {function} callback - Callback function which is called with the updated eventModules object.
 	 */
	subscribeToEventModules(eventId, callback) {
		let ref = this.database().ref(`/eventModules/${eventId}`);
		ref.on('value', snapshot => {
				callback(snapshot.val());
		});
		this.subscriptions[`eventModules_${eventId}`] = ref;
	}

	/**
	 * Get the participants for an event.
	 * @param {string} eventId - The id of the event.
	 * @return Promise which resolve to an eventParticipants object and reject with an error.
 	 */
	getEventParticipants(eventId) {
		let self = this;
		return new Promise((resolve, reject) =>{
			self.database().ref(`/eventParticipants/${eventId}`).once('value')
			.then(snapshot => {
				let eventParticipants = snapshot.val();

				if(eventParticipants) {
					resolve(eventParticipants);
				} else {
					reject('No modules exists for that event');
				}
			})
			.catch(err => {
				reject(err);
			})
		})
	}

	/**
	 * Subsribe to changes to the participants of an event. USE WITH CARE
	 * @param {string} eventId - The id of the event.
	 * @param {function} callback - Callback function which is called with the updated eventParticipants object.
 	 */
	subscribeToEventParticipants(eventId, callback) {
		let ref = this.database().ref(`/eventParticipants/${eventId}`);
		console.log("hej");
		ref.on('value', snapshot => {
			callback(snapshot.val());
		});
		this.subscriptions[`eventParticipants_${eventId}`] = ref;
	}

	/**
	 * Attend an event
	 * @param {string} eventId - The id of the event.
	 * @param {string} uid - The id of the user.
	 * @returns A Promise which resolves to a success message and rejects with an error.
 	 */
	attendEvent(eventId, uid) {
		let self = this;
		return new Promise((resolve, reject) => {
			let updates = {};
			updates[`/eventParticipants/${eventId}/${uid}`] = true;
			updates[`/userAcceptedEvents/${uid}/${eventId}`] = true;
			self.database().ref().update(updates)
			.then(() => {
				resolve('SUCCESS');
			})
			.catch(err => {
				reject(err);
			});
		})
	}

	/**
	 * Unattend event
	 * @param {string} eventId - The id of the event.
	 * @param {string} uid - The id of the user.
	 * @returns A Promise which resolves to a success message and rejects with an error.
 	 */
	unattendEvent(eventId, uid) {
		let self = this;
		return new Promise((resolve, reject) => {
			let updates = {};
			updates[`/eventParticipants/${eventId}/${uid}`] = null;
			updates[`/userAcceptedEvents/${uid}/${eventId}`] = null;
	        self.database().ref().update(updates)
	        .then(() => {
	            resolve('SUCCESS');
	        })
	        .catch(err => {
	            reject(err);
	        });
	    })
	}

	/**
	 * Subsribe to all events.
	 * @param {function} added - Function to be called when an event is added.
	 * @param {function} changed - Function to be called when an event is changed.
	 * @param {function} deleted - Function to be called when an event is deleted.
 	 */
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