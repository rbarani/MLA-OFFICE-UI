import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

export default class Sidebar extends Component {

    render() {
        return (
            <div>
                <div className="col-md-6 col-lg-12 sidebar-offcanvas pl-0" id="sidebar" role="navigation" style={{ backgroundColor: "#6c0404f5" }}>
                    <ul className="nav flex-column sticky-top pl-0 pt-5 p-3">
                        <li className="nav-item mb-2 mt-3"><a className="nav-link text-secondary" href="#"><h5>Govi Chezhian</h5></a></li>
                        <Link to="">  <li className="nav-item mb-2 "><a className="nav-link text-secondary" href="#"><i className="fas fa-user font-weight-bold"></i> <span className="ml-3">Overview</span></a></li></Link>
                        <li className="nav-item mb-2">
                            <a className="nav-link text-secondary" href="#submenu1" data-toggle="collapse" data-target="#submenu1"><i className="far fa-file-word font-weight-bold"></i> <span className="ml-3"> Reports▾</span></a>
                            <ul className="list-unstyled flex-column pl-3 collapse" id="submenu1" aria-expanded="false">
                                <li className="nav-item mb-2 "><a className="nav-link text-secondary" href=""><i className="fas fa-book-reader"></i> Data Report </a></li>
                                <li className="nav-item mb-2 "><a className="nav-link text-secondary" href=""> <i className="fas fa-book-medical"></i> File Report </a></li>
                            </ul>
                        </li>
                        <li className="nav-item mb-2"><a className="nav-link text-secondary" href="/panchayat"><i className="far fa-chart-bar font-weight-bold"></i> <span className="ml-3">Panchayat Details</span></a></li>
                        <li className="nav-item mb-2"><a className="nav-link text-secondary" href="/petitions-list"><i className="fas fa-tablet-alt font-weight-bold"></i><span className="ml-3">Petitions List</span></a></li>
                        <li className="nav-item mb-2"><a className="nav-link text-secondary" href="#"><i className="fas fa-atom font-weight-bold"></i> <span className="ml-3">Suggestions</span></a></li>
                        <li className="nav-item mb-2"><a className="nav-link text-secondary" href="#"><i className="far fa-folder font-weight-bold"></i> <span className="ml-3">Resolved petitions</span></a></li>
                        <li className="nav-item mb-2"><a className="nav-link text-secondary" href="#">About Consistency</a></li>
                        <li className="nav-item mb-2"><a className="nav-link text-secondary" href="/mla-funds">Total MLA Fund Utilized</a></li>
                    </ul>
                </div>
            </div>
        )
    }
}