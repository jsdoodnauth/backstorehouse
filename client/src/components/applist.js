import React, { Component } from 'react';
import axios from 'axios';

class AppList extends Component {

  state = {
    applist: []
  }

  componentDidMount() {
    axios.get('http://localhost:3001/app')
      .then(res => {
        this.setState({
          applist: res.data
        })
      }).catch((err) => {
        console.log(err);
      });
  }
  render() {
    const { applist } = this.state;
    const appList = applist.length ? (
      applist.map(customer => {
        return (
          <div className="col s12 m6" >
            <div className="card blue-grey darken-1" key={customer._id}>
              <div className="card-content white-text">
                <span className="card-title">{ customer.trackName }</span>
                <p>{ customer.releaseNotes }</p>
              </div>
              <div className="card-action">
                <a href="{ customer.trackViewUrl }">View</a>
              </div>
            </div>
          </div>
        )
      })
    ) : (
      <div className="center">No Apps</div>
    )
    return (
      <div className="container">
        <h2>Apps</h2>
        {appList}
      </div>
    );
  }
}

export default AppList;