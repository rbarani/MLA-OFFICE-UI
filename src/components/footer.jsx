// Header.js
import React, { Component } from 'react';

export default class Footer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      email: '',
      password: '',
      isError: {
        name: '',
        email: '',
        password: ''
      }
    }
  }


  onSubmit = e => {
    e.preventDefault();

    /*  if (formValid(this.state)) {
       console.log(this.state)
     } else {
       console.log("Form is invalid!");
     } */
  };






  render() {
    return (
      <form onSubmit={this.onSubmit} noValidate>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
          />
        </div>

        <button type="submit" className="btn btn-block btn-danger">Create User</button>
      </form>
    );
  }
}