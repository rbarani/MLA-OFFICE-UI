import React, { Component } from 'react';
import UserService from '../services/user.services';

export default class AddPanchayat extends Component {
    constructor(props) {
        super(props);
        this.formValChange = this.formValChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            panchayat_union: "",
            panchayat: "",
            panchayat_president: "",
            panchayat_clerk: "",
            panchayat_vao: "",
            panchayat_papulation: "",
            panchayat_male: "",
            panchayat_female: "",
            panchayat_male_voters: "",
            panchyat_female_voters: "",
            panchayat_category: "",
            total_rations: "",
            total_wards: "",
            unionPanchayatList: []
        };
    }

    handleSubmit(event) {
        event.preventDefault();
        const { method } = this.props.location.state;
        if (method === 'add') {
            const panchayatData = this.state;
            UserService.addPanchayat(panchayatData.panchayat_union, panchayatData.panchayat, panchayatData.panchayat_president, panchayatData.panchayat_clerk, panchayatData.panchayat_vao, panchayatData.panchayat_unoin, panchayatData.panchayat_papulation, panchayatData.panchayat_male, panchayatData.panchayat_female, panchayatData.panchayat_male_voters, panchayatData.panchyat_female_voters, panchayatData.panchayat_category, panchayatData.total_rations, panchayatData.total_wards)
                .then(res => {
                    console.log(res);
                });
        } else {
            const panchayatData = this.state;
            const {panchayat_id } = this.props.location.state;

            UserService.updatePanchayat(panchayat_id,panchayatData.panchayat_union, panchayatData.panchayat, panchayatData.panchayat_president, panchayatData.panchayat_clerk, panchayatData.panchayat_vao, panchayatData.panchayat_unoin, panchayatData.panchayat_papulation, panchayatData.panchayat_male, panchayatData.panchayat_female, panchayatData.panchayat_male_voters, panchayatData.panchyat_female_voters, panchayatData.panchayat_category, panchayatData.total_rations, panchayatData.total_wards)
                .then(res => {
                    console.log(res);
                });
        }
    }

    getUnionAndPanchayat() {
        UserService.getUnionAndPanchayats()
            .then(res => {
                this.setState({ unionPanchayatList: res.data });
            })
    }

    componentDidMount() {
        this.getUnionAndPanchayat();
        const { panchayat, panchayat_id, method } = this.props.location.state;

        if (method === 'edit') {
            const filteredPanchayatDetails = panchayat.filter(res => res.panchayat_id === panchayat_id);
            this.setState({
                panchayat_union: filteredPanchayatDetails[0].panchayat_union,
                panchayat: filteredPanchayatDetails[0].panchayat,
                panchayat_president: filteredPanchayatDetails[0].panchayat_president,
                panchayat_clerk: filteredPanchayatDetails[0].panchayat_clerk,
                panchayat_vao: filteredPanchayatDetails[0].panchayat_vao,
                panchayat_papulation: filteredPanchayatDetails[0].panchayat_papulation,
                panchayat_male: filteredPanchayatDetails[0].panchayat_male,
                panchayat_female: filteredPanchayatDetails[0].panchayat_female,
                panchayat_male_voters: filteredPanchayatDetails[0].panchayat_male_voters,
                panchyat_female_voters: filteredPanchayatDetails[0].panchyat_female_voters,
                panchayat_category: filteredPanchayatDetails[0].panchayat_category,
                total_rations: filteredPanchayatDetails[0].total_rations,
                total_wards: filteredPanchayatDetails[0].total_wards,
            });
        }
    }

    formValChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
        console.log(this.state);
    }

    render() {
        const { method } = this.props.location.state;
        const { unionPanchayatList } = this.state;

        let button;
        let buttonsubmit;
        if (method === 'edit') {
            button = <li className="breadcrumb-item"><a href="#">Update Panchayat Details</a></li>;
            buttonsubmit = <input type='submit' className="btn btn-clr-default btn-block" value='Update Panchayat' />;
        }
        else {
            button = <li className="breadcrumb-item"><a href="#">Add Panchayat Details</a></li>;
            buttonsubmit = <input type='submit' className="btn btn-clr-default btn-block" value='Add Panchayat' />
        }
        let unionPanchayatLists = unionPanchayatList.length > 0 && unionPanchayatList.map((item, i) => {
            return (
                <option key={i} value={item.panchayat_union_id}>{item.panchayat_union}</option>
            )
        }, this);

        const panchayatCat = [{
            name: 'General',
            code: 'GENERAL'
        }, {
            name: 'Schedule Caste',
            code: 'SCHEDULE_CASTE'
        }, {
            name: 'Women',
            code: 'WOMEN_PANCHAYAT'
        }, {
            name: 'Women Schedule Caste',
            code: 'WOMEN_SCHEDULE_PANCHAYAT'
        }];

        let panchayatCategory = panchayatCat.length > 0 && panchayatCat.map((item, i) => {
            return (
                <option key={i} value={item.code}>{item.name}</option>
            )
        }, this);
        return (<div className="col main pt-5 mt-3">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item"><a href="#">Panchayat Details</a></li>
                    {button}
                    <li className="breadcrumb-item active" aria-current="page"></li>
                </ol>
            </nav>
            <div className='row'>
                <div className='col-sm-12'>
                    <form onSubmit={this.handleSubmit}>
                        <div class='row'>
                            <div className='col-sm-6'>
                                <div><span> Union Name</span>
                                    <select className='form-control' name="panchayat_union"
                                        onChange={this.formValChange}>
                                        {unionPanchayatLists}
                                    </select>
                                </div>
                            </div>
                            <div className='col-sm-6'>
                                <div><span>Panchayat Name</span>
                                    <input type="text" value={this.state.panchayat} name="panchayat"
                                        onChange={this.formValChange} className="form-control" />
                                </div>
                            </div>
                            <div className='col-sm-6'>
                                <div><span> Panchayat President Name</span>
                                    <input type="text" value={this.state.panchayat_president} name="panchayat_president"
                                        onChange={this.formValChange} className="form-control" />
                                </div>
                            </div>
                            <div className='col-sm-6'>
                                <div><span>Panchayat Cleak Name</span>
                                    <input type="text" value={this.state.panchayat_clerk} name="panchayat_clerk"
                                        onChange={this.formValChange} className="form-control" />
                                </div>
                            </div>
                        </div>
                        <div class='row'>
                            <div className='col-sm-6'>
                                <div><span>Panchayat VAO Name</span>
                                    <input type="text" value={this.state.panchayat_vao} name="panchayat_vao"
                                        onChange={this.formValChange} className="form-control" />
                                </div>
                            </div>
                            <div className='col-sm-6'>
                                <div><span>Panchayat Total Papulation</span>
                                    <input type="text" value={this.state.panchayat_papulation} name="panchayat_papulation"
                                        onChange={this.formValChange} className="form-control" />
                                </div>
                            </div>
                        </div>
                        <div class='row'>
                            <div className='col-sm-6'>
                                <div><span>Panchayat Male Papulation</span>
                                    <input type="text" value={this.state.panchayat_male} name="panchayat_male"
                                        onChange={this.formValChange} className="form-control" />
                                </div>
                            </div>
                            <div className='col-sm-6'>
                                <div><span>Panchayat Female Papulation</span>
                                    <input type="text" value={this.state.panchayat_female} name="panchayat_female"
                                        onChange={this.formValChange} className="form-control" />
                                </div>
                            </div>
                        </div>
                        <div class='row'>
                            <div className='col-sm-6'>
                                <div><span>Panchayat Male Voters</span>
                                    <input type="text" value={this.state.panchayat_male_voters} name="panchayat_male_voters"
                                        onChange={this.formValChange} className="form-control" />
                                </div>
                            </div>
                            <div className='col-sm-6'>
                                <div><span>Panchayat Female Voters</span>
                                    <input type="text" value={this.state.panchyat_female_voters} name="panchyat_female_voters"
                                        onChange={this.formValChange} className="form-control" />
                                </div>
                            </div>
                        </div>
                        <div class='row'>
                            <div className='col-sm-6'>
                                <div><span>Panchayat Category</span>
                                    <select className='form-control' name="panchayat_category"
                                        onChange={this.formValChange}>
                                        {panchayatCategory}
                                    </select>
                                </div>
                            </div>
                            <div className='col-sm-6'>
                                <div><span>Total Rations</span>
                                    <input type="text" value={this.state.total_rations} name="total_rations"
                                        onChange={this.formValChange} className="form-control" />
                                </div>
                            </div>
                        </div>
                        <div><span>Total Wards</span>
                            <input type="text" value={this.state.total_wards} name="total_wards"
                                onChange={this.formValChange} className="form-control" />
                        </div>
                        {buttonsubmit}
                    </form>
                </div>
            </div>
        </div>)
    }
}