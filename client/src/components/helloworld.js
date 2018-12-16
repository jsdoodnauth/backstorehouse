import React, { Component } from 'react';
import axios from 'axios';

class HelloWorld extends Component {

  state = {
    customers: []
  }

  componentDidMount() {
    axios.get('http://localhost:3001/customers')
      .then(res => {
        this.setState({
          customers: res.data
        })
      }).catch((err) => {
        console.log(err);
      });
  }
  render() {
    const { customers } = this.state;
    const customerList = customers.length ? (
      customers.map(customer => {
        return (
          <div className="post card" key={customer._id}>
            <div className="card-content">
              { customer.name } - { customer.email }
            </div>
          </div>
        )
      })
    ) : (
      <div className="center">No Customers</div>
    )
    return (
      <div className="container">
        <h2>Customers</h2>
        {customerList}
      </div>
    );
  }
}

export default HelloWorld;