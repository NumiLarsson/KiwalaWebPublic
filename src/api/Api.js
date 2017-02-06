import EventApi from './EventApi';
import AuthApi from './AuthApi';

class Api {
  events = new EventApi();
  auth = new AuthApi();

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