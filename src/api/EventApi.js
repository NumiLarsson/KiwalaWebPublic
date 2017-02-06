import Event from '../models/Event';

export default class EventApi {
  getEvent(uuid) {
    return new Promise((resolve, reject) => {
        resolve(new Event);
    });
  }
}