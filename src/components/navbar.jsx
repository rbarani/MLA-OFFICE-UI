import React, { Component } from 'react';
import AuthService from '../services/auth.services';
import UserProfile from '../components/user-profile';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';


export default class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '', lastName: '',
            user_id: ''
        }
    }

    componentDidMount() {
        this.getUserDetails();
    }

    logout() {
        localStorage.removeItem('user');
    }

    getUserDetails() {
        const response = AuthService.getCurrentUser();
        this.user = response.response[0];
        console.log(this.user)
        this.setState({ firstName: this.user.first_name }, () => {
            console.log(this.state.firstName, 'dealersOverallTotal1');
        });
    }

    render() {
        return (<BrowserRouter>
            <div> <nav className="navbar fixed-top navbar-expand-md navbar-dark bg-dark mb-3">
                <div className="flex-row d-flex">
                    <button type="button" className="navbar-toggler mr-2 " data-toggle="offcanvas" title="Toggle responsive left sidebar">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <a className="navbar-brand" href="#" title="Free Bootstrap 4 Admin Template"><b>MLA CELL</b></a>
                </div>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsingNavbar">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="navbar-collapse collapse" id="collapsingNavbar">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <a className="nav-link" href="/">Home <span className="sr-only">Home</span></a>
                        </li>
                        <li className="nav-item">
{/*                             <a className="nav-link" href="//www.codeply.com">{this.state.firstName}</a>
 */}                        </li>
                    </ul>
                    <ul className="navbar-nav ml-auto">
                     {/*    <li className="nav-item">
                            <Link to="/user-profile">Profile</Link>
                        </li> */}
                        <li className="nav-item">
                            <a className="nav-link" href="/" data-target="#myModal" data-toggle="modal" onClick={this.logout}>Logout</a>
                        </li>
   
                    </ul>
                </div>
            </nav></div><Switch>
                <Route path="/user-profile" component={UserProfile} />
            </Switch> </BrowserRouter>);
    }
}