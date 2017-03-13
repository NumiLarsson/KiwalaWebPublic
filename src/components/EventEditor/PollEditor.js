import React, {Component} from 'react';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import { Field, reduxForm, formValueSelector, reset } from 'redux-form';
import CircularProgress from 'material-ui/CircularProgress';
import {connect} from "react-redux";
import { initNewPollAndOpenEditor, closePollEditor } from '../../actions/eventeditor'
import './styles/polleditor.css';

const customContentStyle = {
  width: '100%',
  maxWidth: 'none',
};

class PollEditor extends Component {

    constructor() {
        super();

        this.handleClose        = this.handleClose.bind(this);
        this.handleSubmit        = this.handleSubmit.bind(this);
        this.createNewPoll      = this.createNewPoll.bind(this);
    }

    createNewPoll() {
        this.props.initNewPollAndOpenEditor();
    }

    handleClose() {
        this.props.closePollEditor();
        //Use data from editor
        this.props.resetForm('eventeditor-poll');
    }

    handleSubmit() {

    }

    render() {
        const actions = [
          <FlatButton
            label="Cancel"
            primary={true}
            onTouchTap={this.handleClose}
          />,
          <FlatButton
            label="Submit"
            primary={true}
            disabled={true}
            onTouchTap={this.handleSubmit}
          />,
        ];

        return (
            <div>
                <FlatButton onTouchTap={this.createNewPoll}
                              label="Create Poll" backgroundColor="#fff"
                              icon={<FontIcon className="material-icons">poll</FontIcon>}/>
                <Dialog
                    title="Create poll"
                    actions={actions}
                    open={this.props.open}
                    onRequestClose={this.handleClose}
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
                            {this.renderPage(this.props.poll)}
                        </div>
                    )}
                </Dialog>
            </div>
        )
    }

    renderPage(poll) {

        let pollChoices = [];

        for (let choice in poll.choices) {
            pollChoices.push(
              <FlatButton key={choice} label={poll.choices[choice]} />
            )
        }

        return (
            <form onSubmit={this.handleClose}>
                <div className="polleditor-poll">
                  <div className="polleditor-poll__question">
                    <i className="material-icons color-gray">bubble_chart</i>
                    <Field className="polleditor-poll__questionfield" placeholder="Question" name="poll_question" component="input" type="text" />
                  </div>
                  <div className="polleditor-poll__choices">
                    {pollChoices}
                  </div>
                </div>
            </form>
        );
    }
}

// Decorate the form component
PollEditor = reduxForm({
    form: 'eventeditor-poll', // a unique name for this form
    enableReinitialize: true
})(PollEditor);

//Maps the state in our store to the props property of the Example object.
const selector = formValueSelector('eventeditor-poll')
const mapStateToProps = (state) => {
    return {
        open: state.eventeditor.polleditor.open,
        loading: state.eventeditor.polleditor.loading,
        poll: {
            active: selector(state, 'poll_active'),
            question: selector(state, 'poll_question'),
            choices: selector(state, 'poll_choices')
        },
        initialValues : {
            poll_question: state.eventeditor.polleditor.poll.question,
            poll_active: state.eventeditor.polleditor.poll.active,
            poll_choices: state.eventeditor.polleditor.poll.choices
        }
    }
}

//Wrapping the action creators in a dispatch call and allowing us to
//access them through the props property of the Example object.
const mapDispatchToProps = (dispatch) => {
  return {
    resetForm: (formName) => {
      dispatch(reset(formName))
    },
    initNewPollAndOpenEditor: () => dispatch(initNewPollAndOpenEditor()),
    closePollEditor: () => dispatch(closePollEditor())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PollEditor);