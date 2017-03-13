import React, { Component } from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import CheckBox from '../Utils/CheckBoxField';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import './styles/eventeditor_polls.css';

class EventEditorPolls extends Component {
    
    render() {
        if(this.props.module) {
            const { handleSubmit } = this.props;
            return (
                <form onSubmit={handleSubmit}>
                  <div className={(this.props.module.enabled) ? "eventeditor-polls" : "eventeditor-polls disabled"}>
                    <div className="eventeditor-polls__header">
                        <i className="material-icons color-green">poll</i>
                        <span> Active polls</span>
                    </div>
                    <div className="eventeditor-polls__mainenabler">
                        <Field label="Show module" name="polls_enabled" component={CheckBox} />
                        { renderSubmitButton(this.props.pristine) }
                    </div>
                    <div className="eventeditor-polls__list">
                        { renderPolls(this.props.polls, this.props.removePoll) }
                    </div>
                  </div>
                </form>
            )
        }
        else {
            return (
                null
            )
        }
    }
}

function renderSubmitButton(pristine) {
    if(pristine) {
        return (
            null
        );
    }
    else {
        return (
            <Field label="Save" name="polls_save" component={RaisedButton} icon={<FontIcon className="material-icons">save</FontIcon>} 
                backgroundColor="#689F38" labelColor="#fff" type="submit" />
        );
    }
}

function renderPolls(polls, removePoll) {
    const listItems = []; 

    for (let id in polls) {

        if (polls.hasOwnProperty(id) && polls[id].active) {

            let pollChoices = [];
            let sumAns = sumAnswers(polls[id].answers);
            let pollAnswers = []

            for (let choice in polls[id].choices) {
                pollChoices.push(
                    <FlatButton key={choice} label={polls[id].choices[choice]} />
                )
                pollAnswers.push(
                    {choice: polls[id].choices[choice], count: sumAns[choice]}
                )
            }

            listItems.push(
                <div key={id.toString()} className="eventeditor-poll">
                      <FlatButton label="Remove" onTouchTap={() => removePoll(id)} icon={<FontIcon className="material-icons" color="#E53935">remove_circle</FontIcon>} />
                      <br/>
                      <div className="eventeditor-poll__question">
                        <i className="material-icons color-gray">bubble_chart</i>
                        <p>{polls[id].question}</p>
                      </div>
                      <div className="eventeditor-poll__results">
                        <ResponsiveContainer>
                            <BarChart data={pollAnswers} margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                                <Bar dataKey="count" fill="#29B6F6" label={true} isAnimationActive={false} />
                                <XAxis dataKey="choice" allowDecimals={false}/>
                                <YAxis hide={true} allowDecimals={false}/>
                            </BarChart> 
                        </ResponsiveContainer>
                      </div>
                      <div className="eventeditor-poll__choices">
                        {pollChoices}
                      </div>
                </div>
            )
        }
    }
    return listItems;
}

function sumAnswers(answers) {
   let summed = {};
   for(let key in answers) {
       let ans = answers[key];
       if (ans in summed) {
           summed[ans] = summed[ans] + 1;
       } else {
           summed[ans] = 1;
       }
   }
   return summed;
}

// Decorate the form component
EventEditorPolls = reduxForm({
  form: 'module-polls', // a unique name for this form
  enableReinitialize: true
})(EventEditorPolls);

//Maps the state in our store to the props property of the Example object.
const selector = formValueSelector('module-polls')
const mapStateToProps = (state) => {
    return {
        module: {
            enabled: selector(state, 'polls_enabled')
        },
        polls: state.eventdata.polls,
        initialValues : {
            polls_enabled: state.eventmodules.polls.enabled
        }
    }
}

//Wrapping the action creators in a dispatch call and allowing us to 
//access them through the props property of the Example object. 
const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(EventEditorPolls);