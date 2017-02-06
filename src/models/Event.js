export default class Event {
  id = null;
  name = null;
  headerImg = null;
  startDate = null;
  description = null;
  participants = [];

  constructor(id, name, startDate, description, headerImg = 'event_header_default.jpg') {
  	this.id = id;
  	this.name = name;
  	this.startDate = startDate;
  	this.description = description;
    this.headerImg = headerImg;
  }
}