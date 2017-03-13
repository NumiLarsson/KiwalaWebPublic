import React, {Component} from 'react';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import CheckBox from '../Utils/CheckBoxField';
import { Field, FieldArray, reduxForm, formValueSelector, reset, submit } from 'redux-form';
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
        this.createNewPoll      = this.createNewPoll.bind(this);
        this.submitPollForm     = this.submitPollForm.bind(this);
    }

    createNewPoll() {
        this.props.initNewPollAndOpenEditor();
    }

    handleClose() {
        this.props.closePollEditor();
        //Use data from editor
        this.props.resetForm('eventeditor-poll');
    }

    submitPollForm() {
        this.props.submitForm('eventeditor-poll');
    }

    render() {
        const actions = [
          <FlatButton
            label="Cancel"
            secondary={true}
            onTouchTap={this.handleClose}
          />,
          <FlatButton
            label="Submit"
            primary={true}
            disabled={this.props.pristine || this.props.poll.question.length < 3}
            type="submit"
            form="polleditor-form"
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
        const { handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit} id="polleditor-form">
                <div className="polleditor-poll">
                  <br/>
                  <div className="polleditor-poll__question">
                    <i className="material-icons color-gray">bubble_chart</i>
                    <Field className="polleditor-poll__questionfield" placeholder="Question" name="poll_question" component="input" type="text" />
                  </div>
                <FieldArray name="poll_choices" component={renderPollChoices} />
                </div>
            </form>
        );
    }
}

const iconButtonStyle = {
    verticalAlign: "center"
}

const renderPollChoices = ({ fields }) => (
  <div className="polleditor-pollchoices">
      <RaisedButton onClick={() => fields.push()}  label="Add answer" />
      <div className="polleditor-poll__choices">
        {fields.map((choice, index) =>
          <div key={index} className="polleditor-poll__choice">
            
            <Field
              className="polleditor-poll__choicefield"
              name={choice}
              type="text"
              component="input"
              placeholder={`Choice #${index + 1}`}/>
              <IconButton style={iconButtonStyle} onClick={() => fields.remove(index)}>
                  <FontIcon className="material-icons" color="#E53935" style={iconButtonStyle}>remove_circle</FontIcon>
              </IconButton>
          </div>
        )}
        {fields.error && <div className="error">{fields.error}</div>}
      </div>
  </div>
)


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
            poll_question: '',
            poll_active: true,
            poll_choices: []
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
    submitForm: (formName) => {
        dispatch(submit(formName))
    },
    initNewPollAndOpenEditor: () => dispatch(initNewPollAndOpenEditor()),
    closePollEditor: () => dispatch(closePollEditor())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PollEditor);