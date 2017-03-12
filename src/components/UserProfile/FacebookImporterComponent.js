import React, {Component} from 'react';
import './styles/upcomingeventslist.css';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import {
    openImporter,
    closeImporter,
    setEvents,
    selectEvent, setSelectedEventStartTime, setSelectedEventEndTime,
    eventCreationInitiated, eventCreationFinished, setPage
} from "../../actions/facebookimporter";
import {List, ListItem, makeSelectable} from 'material-ui/List';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import CircularProgress from 'material-ui/CircularProgress';
import {connect} from "react-redux";
import Api from "../../api/Api";
import './styles/facebookimporter.css';
import moment from 'moment';

class FacebookImporterComponent extends Component {

    constructor() {
        super();

        this.startFacebookImporter = this.startFacebookImporter.bind(this);
        this.exitFacebookImporter = this.exitFacebookImporter.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.previousPage = this.previousPage.bind(this);
        this.renderPage = this.renderPage.bind(this);
        this.setSelectedEvent = this.setSelectedEvent.bind(this);
        this.setStartTime = this.setStartTime.bind(this);
        this.setSelectedEventStartDate = this.setSelectedEventStartDate.bind(this);
        this.setSelectedEventStartTime = this.setSelectedEventStartTime.bind(this);
        this.setEndTime = this.setEndTime.bind(this);
        this.setSelectedEventEndDate = this.setSelectedEventEndDate.bind(this);
        this.setSelectedEventEndTime = this.setSelectedEventEndTime.bind(this);

        Api.facebook.getEvents().then(events => {
            this.props.setEvents(events);
        });
    }

    render() {
        const actions = [];
        if (this.props.page !== 0) {
            actions.push(<FlatButton label="Previous" onTouchTap={this.previousPage}/>)
        } else {
            actions.push(<FlatButton label="Cancel" onTouchTap={this.exitFacebookImporter}/>)
        }

        switch (this.props.page) {
            case 0:
                actions.push(<RaisedButton label="Next" primary={true} onTouchTap={this.nextPage}/>);
                break;
            case 1:
                actions.push(<RaisedButton label="Create" primary={true} onTouchTap={this.nextPage}/>)
                break;
            case 2:
                actions.push(<RaisedButton label="Close" primary={true} onTouchTap={this.exitFacebookImporter}/>)
                break;
            default:
                break;
        }
        return (
            <div>
                <RaisedButton onTouchTap={this.startFacebookImporter}
                              label="Import from FB" backgroundColor="#3b5998"
                              labelColor="#ffffff"/>
                <Dialog
                    title="Facebook Event Importer"
                    actions={actions}
                    open={this.props.active}
                    onRequestClose={this.exitFacebookImporter}
                    autoScrollBodyContent={true}
                >
                    {this.props.loading ? (
                        <div className="importer--loading">
                            <CircularProgress size={60} thickness={7} />
                        </div>
                    ) : (
                        <div style={{
                            marginTop: '1rem'
                        }}>
                            {this.renderPage()}
                        </div>
                    )}
                </Dialog>
            </div>
        )
    }

    startFacebookImporter() {
        this.props.openModal();
    }

    exitFacebookImporter() {
        this.props.setPage(0);
        this.props.closeModal();
    }

    nextPage() {
        // If we are going to the next page after setting up the event
        if (this.props.page === 1) {
            this.props.eventCreationInitiated();
            Api.events.create(this.props.selectedEvent.event)
               .then(success => {
                    this.props.setPage(this.props.page + 1);
                    this.props.eventCreationFinished();
               });
        } else {
            this.props.setPage(this.props.page + 1);
        }
    }

    previousPage() {
        this.props.setPage(this.props.page - 1);
    }

    renderPage() {
        switch (this.props.page) {
            default:
            case 0:
                let SelectableList = makeSelectable(List);

                return (
                    <SelectableList
                        value={this.props.selectedEvent.id}
                        onChange={this.setSelectedEvent}
                    >
                        {this.renderEvents(this.props.events)}
                    </SelectableList>
                );
            case 1:
                return (
                    <Card>
                        <CardTitle title="Review Event Details" />
                        <CardText>
                            <div className="event-details">
                                <TextField
                                    floatingLabelText="Name"
                                    defaultValue={this.props.selectedEvent.event.name}
                                    fullWidth={true}
                                />
                                <TextField
                                    floatingLabelText="Description"
                                    defaultValue={this.props.selectedEvent.event.description}
                                    multiLine={true}
                                    fullWidth={true}
                                />
                                <div className="event-details__date">
                                    <DatePicker
                                        floatingLabelText="Start Date"
                                        defaultDate={this.props.selectedEvent.event.start_time}
                                        onChange={this.setSelectedEventStartDate}
                                    />
                                    <TimePicker
                                        floatingLabelText="Start Time"
                                        defaultTime={this.props.selectedEvent.event.start_time}
                                        onChange={this.setSelectedEventStartTime}
                                        />
                                </div>

                                {this.props.selectedEvent.event.end_time ? (
                                    <div className="event-details__date">
                                        <DatePicker
                                            floatingLabelText="End Date"
                                            defaultDate={this.props.selectedEvent.event.end_time}
                                            minDate={this.props.selectedEvent.event.start_time}
                                            onChange={this.setSelectedEventEndDate}
                                        />
                                        <TimePicker
                                            floatingLabelText="End Time"
                                            defaultTime={this.props.selectedEvent.event.end_time}
                                            onChange={this.setSelectedEventEndTime}
                                        />
                                    </div>
                                    ) : (
                                        <div className="event-details__date">
                                            <DatePicker
                                                floatingLabelText="End Date"
                                                minDate={this.props.selectedEvent.event.start_time}
                                                onChange={this.setSelectedEventEndDate}
                                            />
                                            <TimePicker
                                                floatingLabelText="End Time"
                                                onChange={this.setSelectedEventEndTime}
                                            />
                                        </div>
                                    )
                                }
                            </div>
                        </CardText>
                    </Card>
                );
            case 2:
                return (
                    <div className="importer__final-page">
                        <i className="material-icons color-green importer__final-page-check">check_circle</i>
                        <h3>
                            Your event was added successfully!
                        </h3>
                    </div>
                )
        }
    }

    setSelectedEvent(event, index) {
        this.props.selectEvent({id: index, event: {}});
        Api.facebook.getEvent(index)
            .then(event => {
                console.log(event);
                this.props.selectEvent({
                    id: index,
                    event: event
                });
            })
    }

    setSelectedEventStartDate(event, date) {
        let newDate = moment(date);
        // Since we create a moment, we don't actually
        // modify the underlying state, but instead
        // we are modifying our copy of the date.
        let currentDate = moment(this.props.selectedEvent.event.start_time);
        currentDate.year(newDate.year());
        currentDate.dayOfYear(newDate.dayOfYear());
        this.setStartTime(currentDate.toDate());
    }

    setSelectedEventStartTime(event, time) {
        let newTime = moment(time);
        let currentTime = moment(this.props.selectedEvent.event.start_time);
        currentTime.hour(newTime.hour());
        currentTime.minute(newTime.minute());

        this.setStartTime(currentTime.toDate());
    }

    setStartTime(time) {
        this.props.setStartTime(time);
    }

    setSelectedEventEndDate(event, date) {
        let newDate = moment(date);
        if (! this.props.selectedEvent.event.end_time) {
            this.setEndTime(newDate.toDate())
        }
        // Since we create a moment, we don't actually
        // modify the underlying state, but instead
        // we are modifying our copy of the date.
        let currentDate = moment(this.props.selectedEvent.event.end_time);
        currentDate.year(newDate.year());
        currentDate.dayOfYear(newDate.dayOfYear());

        this.setEndTime(currentDate.toDate());
    }

    setSelectedEventEndTime(event, time) {
        let newTime = moment(time);

        // You can't set end time before end date
        if (! this.props.selectedEvent.event.end_time) {
            this.setEndTime(null)
        }

        let currentTime = moment(this.props.selectedEvent.event.end_time);
        currentTime.hour(newTime.hour());
        currentTime.minute(newTime.minute());

        this.setEndTime(currentTime.toDate());
    }

    setEndTime(time) {
        this.props.setEndTime(time);
    }

    renderEvents(events) {
        return events.map(event => {
            return (
                <ListItem
                    key={event.id}
                    value={event.id}
                    primaryText={event.name}
                    secondaryText={this.getDescription(event.description)}
                />
            )
        })
    }

    getDescription(description) {
        if (!description) {
            return '';
        }
        let desc = description.replace(/^(.{11}[^\s]*).*/, "$1");

        return desc === description ? desc : desc + '...';
    }
}

//Maps the state in our store to the props property of the Example object.
const mapStateToProps = (state) => {
    return {
        page: state.facebookimporter.page,
        active: state.facebookimporter.active,
        events: state.facebookimporter.events,
        selectedEvent: state.facebookimporter.selectedEvent,
        loading: state.facebookimporter.loading
    }
}

//Wrapping the action creators in a dispatch call and allowing us to
//access them through the props property of the Example object.
const mapDispatchToProps = {
    setPage,
    openImporter,
    closeImporter,
    setEvents,
    selectEvent,
    setSelectedEventStartTime,
    setSelectedEventEndTime,
    eventCreationInitiated,
    eventCreationFinished
}

export default connect(mapStateToProps, mapDispatchToProps)(FacebookImporterComponent);