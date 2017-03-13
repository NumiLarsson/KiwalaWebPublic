import React, {Component} from 'react';
import './styles/upcomingeventslist.css';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import {
    openModal,
    closeModal,
    eventCreationInitiated,
    eventCreationFinished,
    setPage
} from "../../actions/createEventModal";
import CircularProgress from 'material-ui/CircularProgress';
import {connect} from "react-redux";
import Api from "../../api/Api";
import CreateEventForm from './CreateEventForm';

class CreateEventModal extends Component {

    componentWillMount() {
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.previousPage = this.previousPage.bind(this);
        this.renderPage = this.renderPage.bind(this);
    }

    render() {
        const actions = [];
        if (this.props.page === 0) {
            actions.push(<FlatButton label="Cancel" onTouchTap={this.closeModal}/>)
        }

        switch (this.props.page) {
            case 0:
                actions.push(
                    <RaisedButton
                        label="Create"
                        primary={true}
                        disabled={! this.props.event.name.length}
                        onTouchTap={this.nextPage}/>)
                break;
            case 1:
                actions.push(<RaisedButton label="Close" primary={true} onTouchTap={this.closeModal}/>)
                break;
            default:
                break;
        }

        return (
            <div>
                <FlatButton onTouchTap={this.openModal}
                              label="Create"/>
                <Dialog
                    title="Create New Event"
                    actions={actions}
                    open={this.props.active}
                    onRequestClose={this.closeModal}
                    autoScrollBodyContent={true}
                    className="dialog"
                    bodyStyle={{
                        fontSize: '20px'
                    }}
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

    openModal() {
        this.props.openModal();
    }

    closeModal() {
        this.props.setPage(0);
        this.props.closeModal();
    }

    nextPage() {
        // If we are going to the next page after setting up the event
        if (this.props.page === 0) {
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
                return (
                    <CreateEventForm/>
                );
            case 1:
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
}

//Maps the state in our store to the props property of the Example object.
const mapStateToProps = (state) => {
    return {
        page: state.createEventModal.page,
        active: state.createEventModal.active,
        event: state.eventcreator.event,
        loading: state.createEventModal.loading
    }
}

//Wrapping the action creators in a dispatch call and allowing us to
//access them through the props property of the Example object.
const mapDispatchToProps = {
    setPage,
    openModal,
    closeModal,
    eventCreationInitiated,
    eventCreationFinished
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateEventModal);