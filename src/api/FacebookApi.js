import moment from "moment";

/*global FB*/

export default class FacebookApi {
    constructor(auth) {
        this.auth = auth;
    }

    getEvents() {
        return new Promise((resolve, reject) => {
            FB.api(`${this.auth().currentUser.providerData[0].uid}/events`, 'get', this.getDefaultParameters(), (response) => {
                if (! response) {
                    reject('API call failed');
                }

                if (response.error) {
                    reject(response.error)
                }

                resolve(response.data);
            });
        });
    }

    getEvent(eventId) {
        return new Promise((resolve, reject) => {
            FB.api(eventId, this.getDefaultParameters(), (response) => {
                if (! response) {
                    reject('API call failed');
                }

                if (response.error) {
                    reject(response.error)
                }

                response.start_time = moment(response.start_time).toDate();
                response.end_time = response.end_time !== undefined ? moment(response.end_time).toDate() : null;
                resolve(response);
            })
        })
    }

    getDefaultParameters() {
        return {
            access_token: JSON.parse(localStorage.getItem('authentication')).accessToken
        }
    }
}