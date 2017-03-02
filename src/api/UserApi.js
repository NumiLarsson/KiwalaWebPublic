

export default class UserApi {

    constructor(database) {
        this.database = database;
        this.subscriptions = {};
    }

    /**
     * Create a user if it does not exist.
     * @param {object} user - Firebase user object.
     * @returns Promise resolving to a bool representing success and rejecting with an error.
     */
    createUserIfNotExists(user) {
        let self = this;
        return new Promise((resolve, reject) => {
            self.database().ref(`/users/${user.uid}`).once('value')
            .then(snapshot => {
                // User doesn't exist
                if(!snapshot.val()) {
                    let newUser = {};
                    newUser.email = user.email;
                    newUser.name = user.displayName || null;
                    newUser.photoURL = user.photoURL || null;
                    self.database().ref(`/users/${user.uid}`).set(newUser);
                }
                resolve(true);
            })
            .catch(err => {
                reject(err);
            })
        })
    }

    /**
     * Create a user if it does not exist.
     * @param {object} user - Firebase user object.
     * @param {dataUpdates} user - Object containing fields of change.
     * @returns Promise resolving to a bool representing success and rejecting with an error.
     */
    updateUserProfile(user, dataUpdates) {
        let self = this;
        return new Promise((resolve, reject) => {
            self.database().ref(`/users/${user.uid}`).once('value')
            .then(snapshot => {
                // User exist
                if(snapshot.val()) {
                    let updates = {}
                    Object.keys(dataUpdates).forEach(key => {
                        updates[`users/${user.uid}/${key}`] = dataUpdates[key];
                    });
                    self.database().ref().update(updates)
                    .then(() => {
                        resolve(true);
                    })
                    .catch(err => {
                        reject(err);
                    });
                }
                else {
                    resolve(true);
                }
            })
            .catch(err => {
                reject(err);
            })
        })
    }

    /**
     * Subscribe to data about the user.
     * @param {string} uid - ID of the user.
     * @param {function} cb - Function to call when the data changes.
     */    
    getAcceptedEvents(uid, callback) {
        let ref = this.database().ref(`/userAcceptedEvents/${uid}`);
        ref.on('value', snapshot => {
            callback(snapshot.val());
        });
        this.subscriptions[`userAcceptedEvents_${uid}`] = ref;
    }

    /**
     * Subscribe to data about the user.
     * @param {string} uid - ID of the user.
     * @param {function} cb - Function to call when the data changes.
     */    
    subscribeToUserData(uid, cb) {
        let ref = this.database().ref(`/users/${uid}`);
        ref.on('value', (snapshot) => {
            cb(snapshot.val());
        });
        this.subscriptions[uid] = ref;
    }

    /**
    * Clear all subscriptions.
    */    
    clearSubscriptions() {
        for (var key in this.subscriptions) {
            if (this.subscriptions.hasOwnProperty(key)) {
                this.subscriptions[key].off();
            }
        }
    }
}