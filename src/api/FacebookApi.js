/*global FB*/

export default class FacebookApi {
    constructor(auth) {
        this.auth = auth;
    }

    getEvents() {
        return new Promise((resolve, reject) => {
            console.log(this.auth().currentUser.uid);
            FB.api(`${this.auth().currentUser.providerData[0].uid}/events`, 'get', {
                access_token: JSON.parse(localStorage.getItem('authentication')).accessToken
            }, (response) => {
                if (! response) {
                    reject('API call failed');
                }

                if (response.error) {
                    reject(response.error)
                }

                resolve(response);
            });
        });
    }
}