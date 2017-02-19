import User from '../models/User';

const RESULT = {
  SUCCESS: 'Success'
}
//TODO: Write better error messages.
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

  /**
   * Get the current user signed in to the application.
   * Should be used with care, it updates asynchrounously and may not return the correct user object because of this.
   */
  getCurrentUser() {
    return this.auth().currentUser;
  }


/**
 * Create and sign an user.
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @returns A Promise which resolves to a Firebase.Auth user object and rejects with an error message.
 */
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


 /**
 * Sign in using email and password.
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @returns A Promise which resolves to a Firebase.Auth user object and rejects with an error message.
 */
  loginWithEmail(email="", password="") {
    const self = this;
    console.log('logging in with email');
    return new Promise((resolve, reject) => {
        self.auth().signInWithEmailAndPassword(email, password)
        .then(user => {
            console.log(user);
            // TODO: Store a token to localStorage
          resolve(user);
        })
        .catch(error => {
          let err = EMAIL_LOGIN_ERRORS[error.code] || 'Network error';
          reject(err);
        });
    });
  }


/**
 * Sign in using a Facebook popup.
 * @returns A Promise which resolves to a Firebase.Auth user object and rejects with an error message.
 */
  loginWithFacebookPopup() {
    const provider = new this.auth.FacebookAuthProvider();
    const self = this;
    return new Promise((resolve, reject) => {
      self.auth().signInWithPopup(provider)
      .then(user => {
          // TODO: Store a token to localStorage
        resolve(user);
      })
      .catch(error => {
        let err = FACEBOOK_POPUP_ERRORS[error.code] || 'Network error';
        reject(err);
      })
    })

  }

 /**
 * Sign in using a Facebook redirect. The result can later be obtained by calling getRedirectResult.
 */
  loginWithFacebookRedirect() {
    const provider = new this.auth.FacebookAuthProvider();
    this.auth().signInWithRedirect(provider);
  }


/**
 * Sign in by redirecting to Facebook.
 * @returns A Promise which resolves to an object which can be used to obtain the Facebook user credentials if a successful login. It rejects with an error message.
 * If no redirect has been performed it returns null.
 */
  getRedirectResult() {
    const self = this;
    return new Promise((resolve, reject) => {
        self.auth().getRedirectResult().then(user => {
            // TODO: Store a token to localStorage
          resolve(user);
        })
        .catch(error => {
          let err = FACEBOOK_REDIRECT_LOGIN_ERRORS[error.code] || 'Unknown error, contact support';
          reject(err);
        });
    });
  }

/**
 * Logout from the application
 * @returns A Promise which resolves to a Success message and rejects with an error message.
 */
  logout() {
    const self = this;
    return new Promise((resolve, reject) => {
        self.auth().signOut()
        .then(() => {
            // TODO: Clear token from localStorage
          resolve(RESULT.SUCCESS);
        }).catch(error => {
          reject(error);
        });
    });
  }

  loggedIn() {
    return !!localStorage.token;
  }
}