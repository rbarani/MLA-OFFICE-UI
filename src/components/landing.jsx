import React, { Component } from 'react';
import AuthService from '../services/auth.services';
import login from '../imgs/login.png'; // Tell webpack this JS file uses this image
const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);
const passRegex = RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
);

export default class Landing extends Component {
    constructor(props) {
        super(props);
        this.submitForm = this.submitForm.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.state = {
            username: '',
            password: '',
            usererrormsg: '',
            isError: {
                username: '',
                password: ''
            }
        }
    }

    submitForm(event) {
        event.preventDefault();
        if (this.validateForm()) {
            AuthService.loginFormSubmit(this.state.username, this.state.password)
                .then(response => {
                    /*   if (response) {
                          this.setState({ usererrormsg: response });
                      } */
                    this.props.history.push('/dashboard');

                }
                )
                ;
        } else {
            console.log("Form is invalid!");
        }
    }

    validateForm() {
        let isValid = false;
        const isError = this.state.isError;
        const rest = this.state;
        Object.values(isError).forEach(val => {
            if (val.length > 0) {
                isValid = false
            } else {
                isValid = true
            }
        });

        Object.values(rest).forEach(val => {
            if (val === null) {
                isValid = false
            } else {
                isValid = true
            }
        });

        return isValid;
    };

    handleInput(event) {
        const { name, value } = event.target;
        let isError = { ...this.state.isError };
        switch (name) {
            case "username":
                isError.username = emailRegex.test(value)
                    ? ""
                    : "invalid email address";
            case "password":
                isError.password =
                    passRegex.test(value) ? "" : "At least one upper case English letter,Minimum eight in length,At least one special character";
                break;
            default:
                break;
        }
        this.setState({ isError, [name]: value });
    }

    render() {
        const { isError } = this.state;
        return (<div className='wrapper'>
            <div className='container'>
                <div className="row">
                    <div className='col-sm-12'>
                        <div className='outer-layer'>
                            <div className='inner-content'>
                                <form onSubmit={this.submitForm}>
                                    <div className='form-group'> <input type='text' placeholder='UserMail' className="form-control" value={this.state.username} onChange={this.handleInput} name='username' />
                                        <p>{isError.username}</p>
                                    </div>
                                    <div className='form-group'><input type='password' placeholder='Password' className="form-control" value={this.state.password} onChange={this.handleInput} name='password' /></div>
                                    <p>{isError.password}</p>
                                    <p>{this.state.usererrormsg}</p>
                                    <input type='submit' className="btn btn-clr-default btn-block" value='Login' />
                                </form>
                                <div className='forget-pass'>
                                    <a href='#'>Register</a>
                                    <a href='#'>Forget password</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
    }
}