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
	 * Update event data.
	 * @param {string} eventId - The id of the event.
	 * @param {object} dataUpdates - Object mapping the name of the data field to the new value.
	 * @example updateEventData(2. {description: 'New event description'})
 	 */
	updateEventData(eventId, dataUpdates) {
		let self = this;
		return new Promise((resolve, reject) => {
			let updates = {}
			Object.keys(dataUpdates).forEach(key => {
				updates[`eventData/${eventId}/${key}`] = dataUpdates[key];
			});
			self.database().ref().update(updates)
			.then(() => {
				resolve('SUCCESS');
			})
			.catch(err => {
				reject(err);
			});
		});
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
	 * Update the settings for an event module.
	 * @param {string} eventId - The id of the event.
	 * @param {string} module - The name/id of the module.
	 * @param {object} settings - The values to be saved.
 	 */
	updateEventModuleSettings(eventId, module, settings) {
		let self = this;
		return new Promise((resolve, reject) => {
			self.database().ref(`eventModules/${eventId}/${module}`).set(settings)
			.then(() => {
				resolve('SUCCESS');
			})
			.catch(err => {
				reject(err);
			})
		})
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
	 * Subsribe to all polls for an event.
	 * @param {string} eventId - The id for the event.
	 * @param {function} callback - Function to be called when a change occurs.
 	 */
	subscribeToEventPolls(eventId, added, changed) {
		let ref = this.database().ref(`/eventPolls/${eventId}`);
		ref.on('child_added', (snapshot => {
			added(snapshot.val());
		}));

		ref.on('child_changed', (snapshot => {
			changed(snapshot.val());
		}));

		this.subscriptions[`eventPolls_${eventId}`] = ref;
	}

	/**
	 * Subsribe to all answers for a poll.
	 * @param {string} pollId - The id for the poll.
	 * @param {function} callback - Function to be called when a change occurs.
 	 */
	subscribeToEventPollAnswers(pollId, added, changed) {
		let ref = this.database().ref(`/eventPollAnswers/${pollId}`);
		ref.on('child_added', (snapshot => {
			added(Object.assign({}, {}, {
				pollId: pollId,
				uid: snapshot.key,
				val: snapshot.val()
			}));
		}));

		ref.on('child_changed', (snapshot => {
			changed(Object.assign({}, {}, {
				pollId: pollId,
				uid: snapshot.key,
				val: snapshot.val()
			}));
		}));

		this.subscriptions[`eventPollAnswers_${pollId}`] = ref;
	}

	/**
	 * Answer a poll for a event.
	 * @param {string} uid - The user id.
	 * @param {string} pollId - The id for the poll.
	 * @param {string} answerId - Local id for the answer in the poll.
	 * @param {function} callback - Function to be called when a change occurs.
 	 */
	answerEventPoll(uid, pollId, answerId) {
		let self = this;
		return new Promise((resolve, reject) => {
			self.database().ref(`/eventPollAnswers/${pollId}/${uid}`).set(answerId)
			.then(() => {
				resolve('SUCCESS');
			})
			.catch(err => {
				reject(err);
			});
		});
	}

	/**
	 * Check is the user has admin rights to the event.
	 * @param {string} eventId - The id of the event.
	 * @param {string} uid - The id of the user.
	 * @returns A Promise which resolves to an event object.
 	 */
	hasAdminPrivileges(eventId, uid) {
		let self = this;
		return new Promise((resolve, reject) =>{
			self.database().ref(`/eventAdmins/${eventId}/${uid}/`).once('value')
			.then(snapshot => {
				let result = snapshot.val();

				if(result && result !== 0) {
					resolve(result);
				}
				else {
					resolve(false);
				}
			})
			.catch(err => {
				reject(err);
			})
		})
	}

	/**
	 * Check is the user has admin rights to the event.
	 * @param {string} eventId - The id of the event.
	 * @param {string} uid - The id of the user.
	 * @returns A Promise which resolves to an event object.
 	 */
	isAttendingEvent(eventId, uid) {
		let self = this;
		return new Promise((resolve, reject) =>{
			self.database().ref(`/eventParticipants/${eventId}/${uid}/`).once('value')
			.then(snapshot => {
				let result = snapshot.val();

				if(result) {
					resolve(result);
				}
				else {
					resolve(false);
				}
			})
			.catch(err => {
				reject(err);
			})
		})
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

    create(event) {
    	// TODO: add real event creation
		return new Promise((resolve, reject) => {
			setTimeout(() => {
		    	resolve(true);
			}, 1000);
		})
	}
}