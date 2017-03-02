import React, { Component } from 'react';
import './styles/app.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
      {/*<div className="App">*/}
            {this.props.children}
      {/*</div>*/}
      </MuiThemeProvider>
    );
  }
}

export default App;
