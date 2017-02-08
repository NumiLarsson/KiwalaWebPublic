export default class Event {
  id = null;
  name = null;
  headerImg = null;
  startDate = null;
  location = null;
  description = null;
  participants = [];

  modules = {};

  constructor(id, name, startDate, description, modules, headerImg = 'event_header_default.jpg') {
  	this.id = id;
  	this.name = name;
  	this.startDate = startDate;
  	this.description = description;
    this.headerImg = headerImg;
    this.modules = modules;
  }
}