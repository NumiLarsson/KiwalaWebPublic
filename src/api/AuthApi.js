import User from '../models/User';
export default class AuthApi {
  login(email, password) {
    return new Promise((resolve, reject) => {
   		resolve(new User);
    });
  }
}