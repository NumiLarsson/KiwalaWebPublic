export default class Event {
  id = null;
  name = null;
  headerImg = null;
  startDate = null;
  location = null;
  description = null;
  participants = [];

  modules = {};

  constructor(id, name, startDate, location, description, modules, participants, headerImg = 'event_header_default.jpg') {
  	this.id = id;
  	this.name = name;
  	this.startDate = startDate;
    this.location = location;
  	this.description = description;
    this.headerImg = headerImg;
    this.modules = modules;
    this.participants = participants;
  }
}