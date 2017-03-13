import React, {Component} from 'react';
import {connect} from "react-redux";
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import {setStartTime, setEndTime, setTitle, setDescription} from "../../actions/eventcreator";
import moment from 'moment';
import './styles/eventcreator.css';

class CreateEventForm extends Component {

    componentWillMount() {
        this.setTitle = this.setTitle.bind(this);
        this.setDescription = this.setDescription.bind(this);
        this.setEndTime = this.setEndTime.bind(this);
        this.setStartTime = this.setStartTime.bind(this);
        this.setEventEndDate = this.setEventEndDate.bind(this);
        this.setEventEndTime = this.setEventEndTime.bind(this);
        this.setEventStartDate = this.setEventStartDate.bind(this);
        this.setEventStartTime = this.setEventStartTime.bind(this);
    }

    render() {
        return (
            <div className="event-create">
                <TextField
                    floatingLabelText="Name"
                    defaultValue={this.props.event.name}
                    fullWidth={true}
                    onChange={this.setTitle}
                    floatingLabelStyle={{
                        top: '34px'
                    }}
                />
                <TextField
                    floatingLabelText="Description"
                    defaultValue={this.props.event.description}
                    multiLine={true}
                    fullWidth={true}
                    onChange={this.setDescription}
                    floatingLabelStyle={{
                        top: '34px'
                    }}
                />
                <div className="event-create__date">
                    <DatePicker
                        floatingLabelText="Start Date"
                        defaultDate={this.props.event.start_time}
                        onChange={this.setEventStartDate}
                        floatingLabelStyle={{
                            top: '34px'
                        }}
                        fullWidth={true}
                        className="flex"
                    />
                    <TimePicker
                        floatingLabelText="Start Time"
                        defaultTime={this.props.event.start_time}
                        onChange={this.setEventStartTime}
                        floatingLabelStyle={{
                            top: '34px'
                        }}
                        fullWidth={true}
                        className="flex"
                    />
                </div>

                {this.props.event.end_time ? (
                        <div className="event-create__date">
                            <DatePicker
                                floatingLabelText="End Date"
                                defaultDate={this.props.event.end_time}
                                minDate={this.props.event.start_time}
                                onChange={this.setEventEndDate}
                                floatingLabelStyle={{
                                    top: '34px'
                                }}
                                fullWidth={true}
                                className="flex"
                            />
                            <TimePicker
                                floatingLabelText="End Time"
                                defaultTime={this.props.event.end_time}
                                onChange={this.setEventEndTime}
                                floatingLabelStyle={{
                                    top: '34px'
                                }}
                                fullWidth={true}
                                className="flex"
                            />
                        </div>
                    ) : (
                        <div className="event-create__date">
                            <DatePicker
                                floatingLabelText="End Date"
                                minDate={this.props.event.start_time}
                                onChange={this.setEventEndDate}
                                floatingLabelStyle={{
                                    top: '34px'
                                }}
                                fullWidth={true}
                                className="flex"
                            />
                            <TimePicker
                                floatingLabelText="End Time"
                                onChange={this.setEventEndTime}
                                floatingLabelStyle={{
                                    top: '34px'
                                }}
                                fullWidth={true}
                                className="flex"
                            />
                        </div>
                    )
                }
            </div>
        );
    }

    setTitle(event) {
        this.props.setTitle(event.target.value);
    }

    setDescription(event) {
        this.props.setDescription(event.target.value);
    }

    setStartTime(time) {
        this.props.setStartTime(time);
    }

    setEndTime(time) {
        this.props.setEndTime(time);
    }

    setEventStartTime(event, time) {
        let newTime = moment(time);
        let currentTime = moment(this.props.event.start_time);
        currentTime.hour(newTime.hour());
        currentTime.minute(newTime.minute());

        this.setStartTime(currentTime.toDate());
    }

    setEventEndTime(event, time) {
        let newTime = moment(time);

        // You can't set end time before end date
        if (! this.props.event.end_time) {
            this.setEndTime(null)
        }

        let currentTime = moment(this.props.event.end_time);
        currentTime.hour(newTime.hour());
        currentTime.minute(newTime.minute());

        this.setEndTime(currentTime.toDate());
    }

    setEventStartDate(event, date) {
        let newDate = moment(date);
        // Since we create a moment, we don't actually
        // modify the underlying state, but instead
        // we are modifying our copy of the date.
        let currentDate = moment(this.props.event.start_time);
        currentDate.year(newDate.year());
        currentDate.dayOfYear(newDate.dayOfYear());
        this.setStartTime(currentDate.toDate());
    }

    setEventEndDate(event, date) {
        let newDate = moment(date);
        if (! this.props.event.end_time) {
            this.setEndTime(newDate.toDate())
        }
        // Since we create a moment, we don't actually
        // modify the underlying state, but instead
        // we are modifying our copy of the date.
        let currentDate = moment(this.props.event.end_time);
        currentDate.year(newDate.year());
        currentDate.dayOfYear(newDate.dayOfYear());

        this.setEndTime(currentDate.toDate());
    }
}

//Maps the state in our store to the props property of the Example object.
const mapStateToProps = (state) => {
    return {
        event: state.eventcreator.event
    }
}

//Wrapping the action creators in a dispatch call and allowing us to
//access them through the props property of the Example object.
const mapDispatchToProps = {
    setStartTime,
    setEndTime,
    setTitle,
    setDescription
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateEventForm);