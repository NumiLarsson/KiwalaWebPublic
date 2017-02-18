export default class User {
  name = null;
  id = null;
  email = null;
  upcomingEvents = ["Test"];

  constructor(id, email, name) {
    this.id = id;
    this.email = email;
    this.name = name;
  }

  update(user) {
    this.name = user.name;
    this.id = user.id;
    this.email = user.email;
  }
}