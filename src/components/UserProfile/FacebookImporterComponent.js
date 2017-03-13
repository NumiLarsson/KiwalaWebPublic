import React, {Component} from 'react';
import './styles/upcomingeventslist.css';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import {
    openImporter,
    closeImporter,
    setEvents,
    selectEvent,
    eventCreationInitiated, eventCreationFinished, setPage
} from '../../actions/facebookimporter';
import {
    setStartTime,
    setEndTime,
    setTitle,
    setDescription
} from '../../actions/eventcreator';
import {List, ListItem, makeSelectable} from 'material-ui/List';
import CircularProgress from 'material-ui/CircularProgress';
import {connect} from "react-redux";
import Api from "../../api/Api";
import './styles/facebookimporter.css';
import moment from 'moment';
import CreateEventForm from './CreateEventForm';

class FacebookImporterComponent extends Component {

    constructor() {
        super();

        this.startFacebookImporter = this.startFacebookImporter.bind(this);
        this.exitFacebookImporter = this.exitFacebookImporter.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.previousPage = this.previousPage.bind(this);
        this.renderPage = this.renderPage.bind(this);
        this.setSelectedEvent = this.setSelectedEvent.bind(this);

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
                actions.push(
                    <RaisedButton
                        label="Next"
                        primary={true}
                        disabled={this.props.selectedEvent === null}
                        onTouchTap={this.nextPage}/>
                );
                break;
            case 1:
                actions.push(
                    <RaisedButton
                        label="Create"
                        primary={true}
                        disabled={! this.props.event.name.length}
                        onTouchTap={this.nextPage}/>
                )
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
        this.props.openImporter();
    }

    exitFacebookImporter() {
        this.props.setPage(0);
        this.props.closeImporter();
    }

    nextPage() {
        // If we are going to the next page after setting up the event
        if (this.props.page === 1) {
            this.props.eventCreationInitiated();
            Api.events.create(this.props.event, Api.auth.getCurrentUser())
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
                        value={this.props.selectedEvent}
                        onChange={this.setSelectedEvent}
                    >
                        {this.renderEvents(this.props.events)}
                    </SelectableList>
                );
            case 1:
                return (
                    <CreateEventForm/>
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
        this.props.selectEvent(index);
        Api.facebook.getEvent(index)
            .then(event => {
                this.props.setTitle(event.name);
                this.props.setDescription(event.description);
                this.props.setStartTime(event.start_time);
                this.props.setEndTime(event.end_time);
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
        event: state.eventcreator.event,
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
    eventCreationInitiated,
    eventCreationFinished,
    setStartTime,
    setEndTime,
    setTitle,
    setDescription
}

export default connect(mapStateToProps, mapDispatchToProps)(FacebookImporterComponent);