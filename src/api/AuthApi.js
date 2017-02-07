import User from '../models/User';

const RESULT = {
  SUCCESS: 'Success'
}

const ACCOUNT_CREATION_ERRORS = {
    'auth/email-already-in-use': 'Email already in use',
    'auth/invalid-email': 'Invalid email address',
    'auth/operation-not-allowed': 'Unknown error',
    'auth/weak-password': 'Need a stronger password'
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

  //Get the current user if any.
  getCurrentUser() {
    return this.auth().currentUser;
  }


  //A successful create also logs the user in.
  createUser(email="", password="") {
      let self = this;
      return new Promise((resolve, reject) => {
          self.auth().createUserWithEmailAndPassword(email, password)
          .then((user) => {
              resolve(user);
          })
          .catch(error => {
              let err = ACCOUNT_CREATION_ERRORS[error.code] || 'Network error';
              reject(err);
          })
      })
    }  

  /*
    Register to listen for auth changes.
    Returns a function which can be used to unregister the listener. 
  */
  listenForAuthChanges(signedIn, signedOut) {
    return this.auth().onAuthStateChanged(user => {
      if (user) {
        signedIn(user);
      } else {
        signedOut();
      } 
    });
  }

  loginWithEmail(email="", password="") {
    const self = this;
    return new Promise((resolve, reject) => {
        self.auth().signInWithEmailAndPassword(email, password)
        .then(user => {
          resolve(user);
        })
        .catch(error => {
          let err = EMAIL_LOGIN_ERRORS[error.code] || 'Network error';
          reject(err);
        });
    }); 
  }



  loginWithFacebookPopup() {
    const provider = new this.auth.FacebookAuthProvider();
    const self = this;
    return new Promise((resolve, reject) => {
      self.auth().signInWithPopup(provider)
      .then(user => {
        resolve(user);
      })
      .catch(error => {
        let err = FACEBOOK_POPUP_ERRORS[error.code] || 'Network error';
        reject(err);
      })
    })
    
  }

  loginWithFacebookRedirect() {
    const provider = new this.auth.FacebookAuthProvider();
    this.auth().signInWithRedirect(provider);
  }

  getRedirectResult() {
    const self = this;
    return new Promise((resolve, reject) => {
        self.auth().getRedirectResult().then(result => {
          resolve(result);
        })
        .catch(error => {
          let err = FACEBOOK_REDIRECT_LOGIN_ERRORS[error.code] || 'Unknown error, contact support';
          reject(err);
        });
    });
  }
    

  logout() {
    const self = this;
    return new Promise((resolve, reject) => {
        self.auth().signOut()
        .then(() => {
          resolve(RESULT.SUCCESS);
        }).catch(error => {
          reject(error);
        });
    });
  }
}