import User from '../models/User';

const RESULT = {
  SUCCESS: 'Success'
}

const EMAIL_LOGIN_ERRORS = {
    'auth/invalid-email' : 'Invalid email address',
    'auth/user-disabled' : 'Account disabled',
    'auth/user-not-found': 'User does not exist',
    'auth/wrong-password': 'Wrong password'
}

const FACEBOOK_REDIRECT_LOGIN_ERRORS = {
    'auth/account-exists-with-different-credential' : 'A regular account with the same email already exists',
    'auth/credential-already-in-use' : 'Account already exist',
    'auth/email-already-in-use' : 'Email is already in use by another account',
    'auth/timeout' : 'Request timed out'
}

const FACEBOOK_POPUP_ERRORS = {
  'auth/account-exists-with-different-credential': 'A regular account with the same email already exists',
  'auth/auth-domain-config-required' : 'Configuration Error',
  'auth/cancelled-popup-request' : 'Request canceled',
  'auth/operation-not-allowed' : 'Account type not enabled',
  'auth/operation-not-supported-in-this-environment' : 'Operation not supported in this environment',
  'auth/popup-blocked' : 'Popup blocked',
  'auth/popup-closed-by-user' : 'Popup closed by user',
  'auth/unauthorized-domain' : 'Unauthorized domain'
}

export default class AuthApi {

  constructor(auth) {
    this.auth = auth;
  }

  login(email, password) {
    return new Promise((resolve, reject) => {
        resolve(new User);
    });
  }

  //
  getCurrentUser() {
    return this.auth().currentUser;
  }

  listenForAuthChanges(signedIn, signedOut) {
    this.auth().onAuthStateChanged(user => {
      if (user) {
        signedIn(user);
      } else {
        signedOut();
      } 
    });
  }

  loginWithEmail(email, password) {
    return new Promise((resolve, reject) => {
        this.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
          resolve(RESULT.SUCCESS);
        })
        .catch(error => {
          let err = EMAIL_LOGIN_ERRORS[error.code] || 'Network error';
          reject(err);
        });
    }); 
  }

  loginWithFacebook() {
    const provider = new this.auth.FacebookAuthProvider();
    this.auth().signInWithRedirect(provider);
  }

  loginWithFacebookPopup() {
    const provider = new fb.auth.FacebookAuthProvider();
    return new Promise((resolve, reject) => {
      this.auth().signInWithPopup(provider)
      .then(() => {
        resolve(RESULT.SUCCESS);
      })
      .catch(error => {
        let err = FACEBOOK_POPUP_ERRORS[error.code] || 'Network error';
        reject(err);
      })
    })
    
  }

  getRedirectResult() {
    return new Promise((resolve, reject) => {
        fb.auth().getRedirectResult().then((result) => {
          resolve(result);
        })
        .catch(error => {
          let err = FACEBOOK_REDIRECT_LOGIN_ERRORS[error.code] || 'Unknown error, contact support';
          reject(err);
        });
    });
  }
    

  signOut() {
    return new Promise((resolve, reject) => {
        fb.auth().signOut()
        .then(() => {
          resolve(RESULT.SUCCESS);
        }).catch(error => {
          reject(error);
        });
    });
  }
}