import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

import Navbar from '../../src/components/navbar';
import Sidebar from '../../src/components/sidebar';
import Dashboard from '../../src/components/dashboard';
import UserProfile from '../../src/components/user-profile';
import Routes from '../../src/components/routes';

export default class HomePage extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (<div>
            <BrowserRouter>
                <Navbar />
                <div className="container-fluid" id="main">
                    <div className="row row-offcanvas row-offcanvas-left">
                        <Sidebar />
                        <Routes />
                    </div>
                </div>
            </BrowserRouter>
        </div>)
    }
}