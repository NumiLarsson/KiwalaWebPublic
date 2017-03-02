import React, {Component, PropTypes} from 'react';
import {browserHistory} from 'react-router';
import './styles/upcomingeventslist.css';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import {
    nextPage,
    previousPage,
    openImporter,
    closeImporter,
    setEvents
} from "../../actions/facebookimporter";
import {List, ListItem, makeSelectable} from 'material-ui/List';
import {connect} from "react-redux";
import Api from "../../api/Api";

class FacebookImporterComponent extends Component {

    constructor() {
        super();

        this.startFacebookImporter = this.startFacebookImporter.bind(this);
        this.exitFacebookImporter = this.exitFacebookImporter.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.previousPage = this.previousPage.bind(this);
        this.completeImport = this.completeImport.bind(this);
        this.renderPage = this.renderPage.bind(this);

        Api.facebook.getEvents().then(events => {
            console.log(events.data);
            this.props.setEvents(events.data);
        });
    }

    render() {
        const actions = [];
        if (this.props.page !== 0) {
            actions.push(
                <FlatButton
                    label="Previous"
                    onTouchTap={this.previousPage}
                />
            )
        } else {
            actions.push(
                <FlatButton
                    label="Cancel"
                    onTouchTap={this.exitFacebookImporter}
                />
            )
        }
        if (this.props.page !== 3) {
            actions.push(
                <RaisedButton
                    label="Next"
                    primary={true}
                    onTouchTap={this.nextPage}
                />
            )
        } else {
            actions.push(
                <RaisedButton
                    label="Create"
                    primary={true}
                    onTouchTap={this.completeImport}
                />
            )
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
                    <div>
                        {this.renderPage()}
                    </div>
                </Dialog>
            </div>
        )
    }

    startFacebookImporter() {
        this.props.openImporter();
    }

    exitFacebookImporter() {
        this.props.closeImporter();
    }

    nextPage() {
        this.props.nextPage();
    }

    previousPage() {
        this.props.previousPage();
    }

    completeImport() {
        this.exitFacebookImporter();
    }

    renderPage() {
        console.log(this.props.page);
        switch (this.props.page) {
            case 0:
                let SelectableList = makeSelectable(List);

                function wrapState(ComposedComponent) {
                return class SelectableList extends Component {
                    static propTypes = {
                        children: PropTypes.node.isRequired,
                        defaultValue: PropTypes.number.isRequired,
                    };

                    componentWillMount() {
                        this.setState({
                            selectedIndex: this.props.defaultValue,
                        });
                    }

                    handleRequestChange = (event, index) => {
                        this.setState({
                            selectedIndex: index,
                        });
                    };

                    render() {
                        return (
                            <ComposedComponent
                                value={this.state.selectedIndex}
                                onChange={this.handleRequestChange}
                            >
                                {this.props.children}
                            </ComposedComponent>
                        );
                    }
                };
            }

                SelectableList = wrapState(SelectableList);
                return (
                    <SelectableList defaultValue={null}>
                        {this.renderEvents(this.props.events)}
                    </SelectableList>
                )
        }
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

        return desc == description ? desc : desc + '...';
    }
}

//Maps the state in our store to the props property of the Example object.
const mapStateToProps = (state) => {
    return {
        page: state.facebookimporter.page,
        active: state.facebookimporter.active,
        events: state.facebookimporter.events
    }
}

//Wrapping the action creators in a dispatch call and allowing us to
//access them through the props property of the Example object.
const mapDispatchToProps = {
    nextPage,
    previousPage,
    openImporter,
    closeImporter,
    setEvents
}

export default connect(mapStateToProps, mapDispatchToProps)(FacebookImporterComponent);