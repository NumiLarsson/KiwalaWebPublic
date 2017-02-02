export default class Event {
  id = null;
  name = null;
  startDate = null;
  description = null;
  participants = [];

  constructor(id, name, startDate, description) {
  	this.id = id;
  	this.name = name;
  	this.startDate = startDate;
  	this.description = description;
  }
}