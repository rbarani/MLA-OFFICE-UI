// Header.js
import React, { Component } from 'react';
import axios from 'axios';

export default class Content extends Component {
    constructor(props) {
        super();
        this.handleUserInput = this.handleUserInput.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            name: String,
            edit: String,
            isError: {
                name: String,
                edit: String,
            },
            nameValid: false,
            editValid: false,
            formValid: false,
            usersCollection: []
        }
    }
    componentDidMount() {
        axios.get('https://restcountries.eu/rest/v2/all')
            .then(res => {
                this.setState({ usersCollection: res.data });
                console.log(this.state.usersCollection.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    handleUserInput(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value });

    }


    onSubmit(e) {
        e.preventDefault();
        const userObject = {
            name: this.state.name,
            edit: this.state.edit
        };
        axios.post('http://localhost:4000/users/create', userObject)
            .then((res) => {
                console.log(res.data);
            }).catch((error) => {
                console.log(error);
            });
        this.setState({ name: '', edit: '' })
    }

    /*   validateField(fieldName, Value) {
          let fieldValidationErrors = this.state.isError;
          let nameValid = this.state.nameValid;
          let editValid = this.state.editValid;
          switch (fieldName) {
              case 'name':
                  nameValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                  fieldValidationErrors.name = nameValid ? '' : ' is invalid';
                  break;
              case 'edit':
                  passwordValid = value.length >= 6;
                  fieldValidationErrors.edit = editValid ? '' : ' is too short';
                  break;
              default:
                  break;
          }
      }
  
      validateForm() {
          this.setState({ formValid: this.state.nameValid && this.state.editValid });
      } */

    render() {
        return (
            <div className="wrapper">
                <div>
                    <p>sas</p>
                    {this.state.usersCollection.map((person, index) => (
                        <p>Hello, {person.name} from</p>
                    ))}
                </div>
                <form onSubmit={this.onSubmit}>
                    <div className='form-group'>
                        <label>Add</label>
                        <input type="text" value={this.state.name} onChange={(event) => this.handleUserInput(event)} className="form-control" />
                    </div>
                    <div className='form-group'>
                        <label>Edit</label>
                        <input type='text' value={this.state.edit} onChange={(event) => this.handleUserInput(event)} className="form-control" />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-success btn-block" />
                    </div>
                </form>
            </div>
        )
    }
}