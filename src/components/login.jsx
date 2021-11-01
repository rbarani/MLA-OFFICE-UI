import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";
import UserService from '../services/user.services'

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.formValChange = this.formValChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            name: "React",
            first_name: '',
            last_name: '',
            mobile: '',
            gender: '',
            email: '',
            isUserAuthenticated: true,
            users: [],
            userData: [],
        };
    }

    componentDidMount() {
        this.getUser();
        this.getUsersId();
    }

    getUser() {
        UserService.getUsers().then(
            response => {
                this.setState({ users: response.data })
            }
        )
    }

    deleteUser() {
        UserService.deleteUserId('21').then(
            response => {
                console.log(response);

            }
        )
    }

    getUsersId() {
        UserService.getUserId('21').then(
            response => {
                console.log(response.data);
                this.setState({ userData: response.data })
            }
        )
    }

    formValChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        this.setState({ [e.target.name]: [e.target.value] });
        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        UserService.updateUser(
            this.state.first_name,
            this.state.last_name,
            this.state.mobile,
            this.state.gender,
            this.state.email,
        ).then(
            response => {
                console.log(response);
                /*  this.setState({
                   message: response.data.message,
                   successful: true
                 }); */
            })
    }

    render() {
        return (
            <div>
                <div>
                    {this.state.users.map((person, index) => (
                        <div>
                            <p>Hellod, {person.first_name} from {person.last_name}!</p>
                            <button onClick={this.deleteUser} >Delete</button>
                        </div>
                    ))}
                </div>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <div><span>First name</span>
                            <input type="text" value={this.state.first_name} name="first_name"
                                onChange={this.formValChange} className="form-control" />
                        </div>
                        <div><span>Last name</span>
                            <input type="text" value={this.state.last_name} name="last_name"
                                onChange={this.formValChange} className="form-control" />
                        </div>
                        <div><span>Mobile</span>
                            <input type="text" value={this.state.mobile} name="mobile"
                                onChange={this.formValChange} className="form-control" />
                        </div>
                        <div><span>Gender</span>
                            <input type="text" value={this.state.gender} name="gender"
                                onChange={this.formValChange} className="form-control" />
                        </div>
                        <div><span>Email</span>
                            <input type="text" value={this.state.email} name="email"
                                onChange={this.formValChange} className="form-control" />
                        </div>
                        <div className="form-group">
                            <input type="submit" value="Create User" className="btn btn-success btn-block" />
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}