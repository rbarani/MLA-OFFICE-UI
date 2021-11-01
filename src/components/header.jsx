// Header.js
import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Content from './content';
import Footer from './footer';
import Home from './home';
export default class Header extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      visible: false
    };

    this.ShowSideBar = this.ShowSideBar.bind(this);
  }

  ShowSideBar() {
    this.setState({
      visible: !this.state.visible
    });
  }

  render() {
    return (
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/content">Content</Link>
            </li>
            <li>
              <Link to="/footer">About</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
          </ul>
        </div>

        <div>
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/footer" component={Footer} />
            <Route path="/content" component={Content} />
            <Route path="/footer" component={Footer} />
          </Switch>
        </div>
      </Router>
    )
  }
}