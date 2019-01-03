import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import './App.css';
import Nav from './components/nav';
import AppList from './components/App/AppList'
import AppDetails from './components/App/AppDetails';

class App extends Component {
  render() {
    return (
      <div className="App">
        <CssBaseline />
        <Nav />
        <div className="app-content">
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={ AppList }></Route>
            <Route path='/app/:id' component={ AppDetails } ></Route>
            <Route path='/signin' component={ AppDetails }></Route>
            <Route path='/signup' component={ AppDetails }></Route>
            <Route path='/create' component={ AppDetails }></Route>
          </Switch>
        </BrowserRouter>
        </div>
      </div>
    );
  }
}

export default App;
