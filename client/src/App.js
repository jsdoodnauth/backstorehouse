import React, { Component } from 'react';
import './App.css';
import AppList from './components/applist';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="row">
              <AppList />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
