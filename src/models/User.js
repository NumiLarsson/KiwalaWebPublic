export default class User {
  name = null;
  upcomingEvents = [];

  update(user) {
    this.name = user;
  }
}