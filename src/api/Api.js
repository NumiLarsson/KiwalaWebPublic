import EventApi from './EventApi';
import AuthApi from './AuthApi';
import firebase from 'firebase';

const FIREBASE_CONFIG = {
    apiKey: "AIzaSyA1tyluu4z1tOi8JluXy1kagarZa6EWLyI",
    authDomain: "kiwala-23a4a.firebaseapp.com",
    databaseURL: "https://kiwala-23a4a.firebaseio.com",
    storageBucket: "kiwala-23a4a.appspot.com",
    messagingSenderId: "44705571393"
};

firebase.initializeApp(FIREBASE_CONFIG);

class Api {
  events = new EventApi(firebase.database);
  auth = new AuthApi(firebase.auth);

  constructor() {
    if (!Api.instance) {
      Api.instance = this;
    }

    return Api.instance;
  }
}

const api = new Api();
Object.freeze(api);

export default api;