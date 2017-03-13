import React, {Component} from 'react';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';
import {connect} from "react-redux";
import { openPollEditor, closePollEditor } from '../../actions/eventeditor'
import './styles/polleditor.css';

const customContentStyle = {
  width: '100%',
  maxWidth: 'none',
};

class PollEditor extends Component {

    constructor() {
        super();

        this.handleClose = this.handleClose.bind(this);
    }

    handleClose() {
        //Use data from editor
    }

    render() {
        const actions = [
          <FlatButton
            label="Cancel"
            primary={true}
            onTouchTap={this.props.closePollEditor}
          />,
          <FlatButton
            label="Submit"
            primary={true}
            disabled={true}
            onTouchTap={this.handleClose}
          />,
        ];

        return (
            <div>
                <FlatButton onTouchTap={this.props.openPollEditor}
                              label="Create Poll" backgroundColor="#fff"
                              icon={<FontIcon className="material-icons">poll</FontIcon>}/>
                <Dialog
                    title="Create poll"
                    actions={actions}
                    open={this.props.open}
                    onRequestClose={null}
                    autoScrollBodyContent={true}
                    contentClassName="polleditor-dialog"
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

    renderPage() {
        return (
            <div>
            </div>
        );
    }
}

//Maps the state in our store to the props property of the Example object.
const mapStateToProps = (state) => {
    return {
        open: state.eventeditor.polleditor.open,
        loading: state.eventeditor.polleditor.loading
    }
}

//Wrapping the action creators in a dispatch call and allowing us to
//access them through the props property of the Example object.
const mapDispatchToProps = {
    openPollEditor,
    closePollEditor
}

export default connect(mapStateToProps, mapDispatchToProps)(PollEditor);