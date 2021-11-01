import React, { Component } from 'react';
import { useHistory } from 'react-router-dom';
import UserService from '../services/user.services';
import { Link } from 'react-router-dom';
import avatar from '../imgs/login.png'; // Tell webpack this JS file uses this image
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faMapMarker, faAlignJustify, faMapSigns, faCalendar, faWindowClose, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import dateFormat from 'dateformat';
export default class PetitionsLists extends Component {
    constructor(props) {
        super(props);
        this.state = {
            petitions: [],
            method: '',
            petitions_id: ''
        }
        this.getPetitionsLists();
    }

    getPetitionsLists() {
        UserService.getPetitions().then(res => {
            this.setState({ petitions: res.data });
        });
    }
    renderSwitch(param) {
        switch (param) {
            case 1:
                return <span><FontAwesomeIcon icon={faThumbsDown} /> Pending</span>;
            case 2:
                return <span><FontAwesomeIcon icon={faThumbsUp} /> Solved</span>;
            case 3:
                return  <span><FontAwesomeIcon icon={faWindowClose} /> Rejected</span>;
            default:
                return 'Not Valid';
        }
    }
  /*   renderUnionSwitch(param) {
        switch (param) {
            case 1:
                return 'Thirupanandal';
            case 2:
                return 'Thiruvidaimaruthur';
            case 3:
                return 'Kumbakonam';
            default:
                return 'Not Valid';
        }
    } */

    render() {
        const { petitions } = this.state;

        return (<div className="col main pt-5 mt-3">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item"><a href="#">Petitions</a></li>
                    <li className="breadcrumb-item active" aria-current="page"></li>
                </ol>
            </nav>
            <div className='container'>
                <div className='row'>
                    <div className='col-sm-6'>
                        <form>
                            <div className="form-group">
                                <select className="form-control" id="sel1">
                                    <option>Today</option>
                                    <option>This Week</option>
                                    <option>This Month</option>
                                    <option>Last Month</option>
                                    <option>This Year</option>
                                    <option>All</option>
                                </select>
                            </div>
                        </form>
                    </div>
                    <div className='col-sm-6'>
                        <Link to={{ pathname: '/petitions-list/add-petitions', state: { method: 'add' } }} className='btn btn-clr-default btn-block'>Add Petitions</Link>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='col-sm-12'>
                    <p className="lead d-none d-sm-block">Petitions Details</p>
                </div>
            </div>
            <div className='row'>
                <div className='col-sm-12'>
                    <div className='container'>
                        {this.state.petitions.map((petitions, index) =>
                            <div className='petitions-lists' key={index}>
                                <Link to={{ pathname: '/petitions-list/add-petitions', state: { method: 'edit', petitions: this.state.petitions, petitions_id: petitions.petition_id } }}>
                                    <div className='avatar'>
                                        <img src={avatar} alt="Avatar" className="avatar" />
                                    </div>
                                    <div className='float-left'>
                                        <div className='petions'>
                                            <h4>{petitions.name}</h4>
                                            <h6>< FontAwesomeIcon icon={faMapMarker} /> {petitions.door_no} / {petitions.street},</h6>
                                            <h6>{petitions.panchayat_name}, {petitions.pincode}</h6>
                                        </div>
                                        <div className='left'>
                                            <h6> <FontAwesomeIcon icon={faPhone} /> {petitions.mobile}</h6>
                                            <h6><FontAwesomeIcon icon={faCalendar} />  {dateFormat(petitions.created_at, "mmmm dS, yyyy")}</h6>
                                        </div>
                                        <div className='left'>
                                            <h6><FontAwesomeIcon icon={faMapSigns} /> {petitions.department}</h6>
                                         
                                            <h6>{this.renderSwitch(petitions.petition_status)}</h6>

                                        </div>
                                        <div className='complaints'> <h6>{petitions.complaints}</h6></div>
                                    </div>
                                </Link>
                            </div>
                        )}
                    </div>
                </div></div></div>
        )
    }
}
