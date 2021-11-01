import React, { Component } from 'react';
import AuthService from '../services/auth.services';
import UserService from '../services/user.services';
import avatar from '../imgs/login.png';


export default class UserProfile extends Component {
    constructor(props) {
        super(props)
        this.updateProfile = this.updateProfile.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleOptionChange = this.handleOptionChange.bind(this);
        this.state = {
            user_id: '',
            first_name: '',
            last_name: '',
            mobile: '',
            email: '',
            profile_picture: '',
            gender: 'Male'
        }
        this.getUser();
    }
    handleInput(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }
    getUser() {
        const user = AuthService.getCurrentUser();
        this.userId = user.response[0].user_id;
        UserService.getUserId(this.userId)
            .then(res => {
                const userDetails = res.data.response[0];
                this.setState({
                    first_name: userDetails.first_name,
                    last_name: userDetails.last_name,
                    mobile: userDetails.mobile,
                    email: userDetails.email,
                    profile_picture: userDetails.profile_picture,
                    gender: userDetails.gender
                })
            })
    }

    handleOptionChange(changeEvent) {
        this.setState({
            gender: changeEvent.target.value
        });
    }

    updateProfile(event) {
        event.preventDefault();
        const user = AuthService.getCurrentUser();
        this.userId = user.response[0].user_id;
        UserService.updateUser(user.response[0].user_id, this.state.first_name,
            this.state.last_name,
            this.state.mobile,
            this.state.gender,
            this.state.email)
            .then(res => {
                console.log(res);
            });
    }

    render() {
        return (<div className="col main pt-5 mt-3">
            <div className='container'>
                <div className='row'>
                    <h1>Edit Profile</h1>
                    <div>
                        <img src={this.state.profile_picture} alt="Avatar" className="avatar" />

                        <form>
                            <input type='file' />
                            <input type='submit' value='update profile' />
                        </form>
                        <h2>Name:{this.state.first_name} {this.state.last_name}</h2>
                        <h2>Mobile:{this.state.mobile}</h2>
                        <h2>Gender:{this.state.gender}</h2>
                        <h2>Email:{this.state.email}</h2>
                        <form onSubmit={this.updateProfile}>
                            <div className='form-group'>
                                <input type='text' placeholder='First name' className="form-control" value={this.state.first_name} onChange={this.handleInput} name='first_name' />
                            </div>
                            <div className='form-group'>
                                <input type='text' placeholder='Last name' className="form-control" value={this.state.last_name} onChange={this.handleInput} name='last_name' />
                            </div>
                            <div className='form-group'>
                                <input type='text' placeholder='Mobile' className="form-control" value={this.state.mobile} onChange={this.handleInput} name='mobile' />
                            </div>
                            <div className='form-group'>
                                <input type='text' placeholder='Email' className="form-control" value={this.state.email} onChange={this.handleInput} name='email' />
                            </div>
                            <div className='form-group'>
                                <div className="radio">
                                    <label>
                                        <input
                                            type="radio"
                                            value="Male" name='gender'
                                            checked={this.state.gender === "Male"}
                                            onChange={this.handleOptionChange}
                                        />
            Male
          </label>
                                </div>
                                <div className="radio">
                                    <label>
                                        <input
                                            type="radio" name='gender'
                                            value="Female"
                                            checked={this.state.gender === "Female"}
                                            onChange={this.handleOptionChange}
                                        />
            Female
          </label>
                                </div>
                            </div>
                            <div className='btn btn-success'>
                                <input type='submit' className='btn btn-success' value='Update Profile' />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>)
    }
}