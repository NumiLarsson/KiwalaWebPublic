export default class EventApi {
  
  
  constructor(database) {
    this.database = database;
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
				self.database().ref(`/events/${eventId}`).on('value', snapshot => {
					callback(snapshot.val());
				});
				resolve('SUCCESS');
			})
			.catch(err => {
				reject(err);
			})
	});
  }

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

}