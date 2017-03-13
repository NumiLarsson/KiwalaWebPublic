import React, {Component} from 'react';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';
import {connect} from "react-redux";
import './styles/polleditor.css';

class PollEditor extends Component {

    constructor() {
        super();

        this.exitPollEditor = this.exitPollEditor.bind(this);
    }

    openPollEditor() {

    }

    exitPollEditor() {

    }

    render() {
        return (
            <div>
                <FlatButton onTouchTap={this.openPollEditor}
                              label="Create Poll" backgroundColor="#fff"
                              icon={<FontIcon className="material-icons">poll</FontIcon>}/>
                <Dialog
                    title="Facebook Event Importer"
                    actions={null}
                    open={false}
                    onRequestClose={this.exitPollEditor}
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
        
    }
}

//Wrapping the action creators in a dispatch call and allowing us to
//access them through the props property of the Example object.
const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(PollEditor);