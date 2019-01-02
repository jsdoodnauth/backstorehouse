import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import './App.css';
import AppList from './components/applist';
import Nav from './components/nav';

class App extends Component {
  render() {
    return (
      <div className="App">
        <CssBaseline />
        <Nav />
        <div className="app-content">
            <AppList />
        </div>
      </div>
    );
  }
}

export default App;
