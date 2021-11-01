import React, { Component } from 'react';
import UserService from '../services/user.services';

export default class AddPetitions extends Component {
    constructor(props) {
        super(props);
        this.formValChange = this.formValChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            name: "",
            father_name: "",
            gender: "",
            door_no: "",
            street: "",
            panchayat_union: "1",
            panchayat: "",
            mobile: "",
            pincode: "",
            department: "",
            complaints: "",
            departmentCategory: [],
            petitionList: [],
            unionPanchayatList: [],
            petitions_status: ""
        };
        this.setState({ petitionList: [{ id: 1, code: 'PENDING', desc: 'Pending' }, { id: 1, code: 'SOLVED', desc: 'Solved' }, { id: 1, code: 'REJECTED', desc: 'Rejected' }] })
    }

    componentDidMount() {
        this.getDepartmentCategory();
        this.getUnionAndPanchayat();
        const { method } = this.props.location.state;
        if (method === 'edit') {
            const { petitions_id, petitions } = this.props.location.state;
            const filteredPetitionsDetails = petitions.filter(res => res.petition_id === petitions_id);
            this.setState({
                name: filteredPetitionsDetails[0].name,
                father_name: filteredPetitionsDetails[0].father_name,
                gender: filteredPetitionsDetails[0].gender,
                door_no: filteredPetitionsDetails[0].door_no,
                street: filteredPetitionsDetails[0].street,
                panchayat_union: filteredPetitionsDetails[0].panchayat_union,
                panchayat: filteredPetitionsDetails[0].panchayat,
                mobile: filteredPetitionsDetails[0].mobile,
                pincode: filteredPetitionsDetails[0].pincode,
                department: filteredPetitionsDetails[0].department,
                complaints: filteredPetitionsDetails[0].complaints,
                petitions_status: filteredPetitionsDetails[0].petition_status
            });
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        const { method, petitions_id } = this.props.location.state;
        if (method === 'add') {
            UserService.addPetitions(this.state.name, this.state.father_name, this.state.gender, this.state.door_no, this.state.street, this.state.panchayat_union, this.state.panchayat, this.state.mobile, this.state.pincode, this.state.department, this.state.complaints, this.state.petitions_status)
                .then(res => {
                    console.log(res);
                });
        } else {
            UserService.updatePetitions(petitions_id, this.state.name, this.state.father_name, this.state.gender, this.state.door_no, this.state.street, this.state.panchayat_union, this.state.panchayat, this.state.mobile, this.state.pincode, this.state.department, this.state.complaints, this.state.petitions_status)
                .then(res => {
                    console.log(res);
                });
        }
    }

    getDepartmentCategory() {
        UserService.getDepartmentCategorys()
            .then(res => {
                this.setState({ departmentCategory: res.data });
            });
    }

    getUnionAndPanchayat() {
        UserService.getUnionAndPanchayats()
            .then(res => {
                this.setState({ unionPanchayatList: res.data });
            })
    }

    formValChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    render() {
        const { departmentCategory } = this.state;
        const { method } = this.props.location.state;
        let button;
        let buttonsubmit;
        if (method === 'edit') {
            button = <li className="breadcrumb-item"><a href="#">Update Petitions</a></li>;
            buttonsubmit = <input type='submit' className="btn btn-clr-default btn-block" value='Update Petitions' />;
        }
        else {
            button = <li className="breadcrumb-item"><a href="#">Add Petitions Details</a></li>;
            buttonsubmit = <input type='submit' className="btn btn-clr-default btn-block" value='Add Petitions' />
        }
        let departmentCategoryList = departmentCategory.length > 0
            && departmentCategory.map((item, i) => {
                return (
                    <option key={i} value={item.category_code}>{item.category_name}</option>
                )
            }, this);
        const { unionPanchayatList, panchayat_union } = this.state;
        let unionPanchayatLists = unionPanchayatList.length > 0 && unionPanchayatList.map((item, i) => {
            return (
                <option key={i} value={item.panchayat_union_id}>{item.panchayat_union}</option>
            )
        }, this)
        let filteredPanchayat = unionPanchayatList.filter(res => res.panchayat_union_id === Number(panchayat_union));
        let panchayatLists = filteredPanchayat.length && filteredPanchayat[0].panchayats.map((item, i) => {
            return (
                <option key={i} value={item.panchayat}>{item.panchayat}</option>
            )
        }, this)
        const petitionsStatusCat = [{
            name: 'Pending',
            code: '1'
        }, {
            name: 'Resolved',
            code: '2'
        }, {
            name: 'Rejected',
            code: '3'
        }];

        let petitionsStatus = petitionsStatusCat.length > 0 && petitionsStatusCat.map((item, i) => {
            return (
                <option key={i} value={item.code}>{item.name}</option>
            )
        }, this);
        return (<div className="col main pt-5 mt-3">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item"><a href="#">Petitions</a></li>
                    {button}
                    <li className="breadcrumb-item active" aria-current="page"></li>
                </ol>
            </nav>

            <div className='row'>
                <div className='col-sm-12'>
                    <form onSubmit={this.handleSubmit}>
                        <div className='row'>
                            <div className='col-sm-6'>
                                <div><span>Name</span>
                                    <input type="text" value={this.state.name} name="name"
                                        onChange={this.formValChange} className="form-control" />
                                </div>
                            </div>
                            <div className='col-sm-6'>
                                <div><span>Father Name</span>
                                    <input type="text" value={this.state.father_name} name="father_name"
                                        onChange={this.formValChange} className="form-control" />
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-6'>
                                <div><span>Gender</span>
                                    <select className='form-control' value={this.state.gender} name="gender"
                                        onChange={this.formValChange}>
                                        <option>Select</option>
                                        <option value='Male'>Male</option>
                                        <option value='Female'>Female</option>
                                    </select>

                                </div>
                            </div>
                            <div className='col-sm-6'>
                                <div><span>Mobile</span>
                                    <input type="text" value={this.state.mobile} name="mobile"
                                        onChange={this.formValChange} className="form-control" />
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-6'>
                                <div><span>Door no</span>
                                    <input type="text" value={this.state.door_no} name="door_no"
                                        onChange={this.formValChange} className="form-control" />
                                </div>
                            </div>
                            <div className='col-sm-6'>
                                <div><span>Street</span>
                                    <input type="text" value={this.state.street} name="street"
                                        onChange={this.formValChange} className="form-control" />
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-6'>
                                <div><span>Union</span>
                                    <select className='form-control' value={this.state.panchayat_union} name="panchayat_union"
                                        onChange={this.formValChange}>
                                        <option>Select</option>
                                        {unionPanchayatLists}
                                    </select>
                                </div>
                            </div>
                            <div className='col-sm-6'>
                                <div><span>Panchayat</span>
                                    <select className='form-control' value={this.state.panchayat} name="panchayat"
                                        onChange={this.formValChange}>
                                        <option>Select</option>
                                        {panchayatLists}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-6'>
                                <div><span>Pincode</span>
                                    <input type="text" value={this.state.pincode} name="pincode"
                                        onChange={this.formValChange} className="form-control" />
                                </div>
                            </div>
                            <div className='col-sm-6'>
                                <div><span>Department</span>
                                    <select className='form-control' value={this.state.department} name="department"
                                        onChange={this.formValChange}>
                                        <option>Select</option>
                                        {departmentCategoryList}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div><span>Complaints</span>
                            <textarea value={this.state.complaints} name="complaints"
                                onChange={this.formValChange} className="form-control">
                            </textarea>
                        </div>
                        <div><span>Petitions Status</span>
                            <select className='form-control' value={this.state.petitions_status} name="petitions_status"
                                onChange={this.formValChange}>
                                <option>Select</option>
                                {petitionsStatus}
                            </select>
                        </div>
                        {buttonsubmit}
                    </form>
                </div>
            </div>
        </div>)
    }
}