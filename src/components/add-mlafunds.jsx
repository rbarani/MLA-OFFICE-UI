import React, { Component } from 'react';
import UserService from '../services/user.services';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default class AddMlaFunds extends Component {
    constructor(props) {
        super(props);
        this.formValChange = this.formValChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            mla_fund: "",
            scheme_year: "",
            scheme_title: "",
            scheme_desc: "",
            panchayat_union: 2,
            fund_dept: "",
            panchayat: "",
            mla_fund_error: "",
            scheme_year_error: "",
            scheme_title_error: "",
            scheme_desc_error: "",
            panchayat_union_error: "",
            panchayat_error: "",
            unionPanchayatList: [],
            fundDeptCategory: [],
            mlafund: []
        };

    }

    componentDidMount() {
        const { mlafundInfo, method } = this.props.location.state;
        if (method === 'edit') {
            this.getMLAFund(mlafundInfo);
        }
        this.getUnionAndPanchayat();
        this.getFundDeptCategory();
    }

    validateForm() {
        let mla_fund_error = "";
        let scheme_year_error = "";
        let scheme_title_error = "";
        let scheme_desc_error = "";
        let panchayat_union_error = "";
        let panchayat_error = "";

        if (!this.state.panchayat) {
            panchayat_error = "Panchayat field is required";
        }

        /*   const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          if(!this.state.email || reg.test(this.state.email) === false){
              emailError = "Email Field is Invalid ";
          } */

        if (!this.state.scheme_desc_error) {
            scheme_desc_error = "Scheme field is required";
        }

        if (panchayat_error || scheme_desc_error) {
            this.setState({ panchayat_error, scheme_desc_error });
            return false;
        }

        return true;
    }

    getMLAFund(id) {
        UserService.getMlaFundById(id)
            .then(res => {
                this.setState({
                    mla_fund: res.data.response[0].mla_fund,
                    scheme_year: res.data.response[0].scheme_year,
                    scheme_title: res.data.response[0].scheme_title,
                    scheme_desc: res.data.response[0].scheme_desc,
                    fund_dept: res.data.response[0].fund_dept,
                    panchayat_union: res.data.response[0].union_panchayat,
                    panchayat: res.data.response[0].panchayat_name
                });
            })
    }

    handleSubmit(event) {
        event.preventDefault();
        const { method } = this.props.location.state;
        if (method === 'add') {
            if (this.validateForm()) {
                UserService.addMlaFund(this.state.mla_fund, this.state.scheme_year, this.state.scheme_title, this.state.scheme_desc, this.state.panchayat_union, this.state.panchayat, this.state.fund_dept)
                    .then(res => {

                    });
            } else {

            }
        } else {
            if (this.validateForm()) {
                const { mlafundInfo, method } = this.props.location.state;
                UserService.updateMlaFund(mlafundInfo, this.state.mla_fund, this.state.scheme_year, this.state.scheme_title, this.state.scheme_desc, this.state.panchayat_union, this.state.panchayat, this.state.fund_dept)
                    .then(res => {

                    });
            } else {

            }
        }

    }

    getUnionAndPanchayat() {
        UserService.getUnionAndPanchayats()
            .then(res => {
                this.setState({ unionPanchayatList: res.data });
            })
    }

    getFundDeptCategory() {
        UserService.getFundDeptCategorys()
            .then(res => {
                this.setState({ fundDeptCategory: res.data });
            })
    }

    formValChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    render() {
        const { method } = this.props.location.state;
        const { fundDeptCategory } = this.state;
        let fundCategoryLists = fundDeptCategory.length > 0
            && fundDeptCategory.map((item, i) => {
                return (
                    <option key={i} value={item.fund_dept_code}>{item.fund_dept_desc}</option>
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


        let button;
        let buttonsubmit;
        if (method === 'edit') {
            button = <li className="breadcrumb-item"><a href="#">Update Fund</a></li>;
            buttonsubmit = <input type='submit' className="btn btn-clr-default btn-block" value='Update Fund' />;
        }
        else {
            button = <li className="breadcrumb-item"><a href="#">Add Fund</a></li>;
            buttonsubmit = <input type='submit' className="btn btn-clr-default btn-block" value='Add Fund' />
        }
        return (<div className="col main pt-5 mt-3">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item"><a href="#">MLA Fund</a></li>
                    {button}
                    <li className="breadcrumb-item active" aria-current="page"></li>
                </ol>
            </nav>
            <div className='row'>
                <div className='col-sm-12'>
                    <form onSubmit={this.handleSubmit}>
                        <div class='row'>
                            <div className='col-sm-6'>
                                <div><span>Union</span>
                                    <select className='form-control' name="panchayat_union"
                                        onChange={this.formValChange}>
                                             <option>Select</option>
                                        {unionPanchayatLists}
                                    </select>
                                </div>
                            </div>
                            <div className='col-sm-6'>
                                <div><span>Panchayat</span>
                                    <select type="text" value={this.state.panchayat || ''} name="panchayat"
                                        onChange={this.formValChange} className="form-control" >
                                             <option>Select</option>
                                        {panchayatLists}
                                    </select>
                                    <span className="text-danger">{this.state.panchayat_error}</span>
                                </div>
                            </div>
                        </div>
                        <div class='row'>
                            <div className='col-sm-6'>
                                <div><span>Fund Departament</span>
                                    <select type="text" value={this.state.fund_dept || ''} name="fund_dept"
                                        onChange={this.formValChange} className="form-control" >
                                            <option>Select</option>
                                        {fundCategoryLists}
                                    </select>
                                </div>
                            </div>
                            <div className='col-sm-6'>
                                <div><span>MLA Fund</span>
                                    <input type="text" value={this.state.mla_fund || ''} name="mla_fund"
                                        onChange={this.formValChange} className="form-control" />
                                </div>
                            </div>
                        </div>
                        <div><span>Scheme Year</span>
                            <input type="text" value={this.state.scheme_year || ''} name="scheme_year"
                                onChange={this.formValChange} className="form-control" />
                        </div>
                        <div><span>Scheme Title</span>
                            <textarea value={this.state.scheme_title} name="scheme_title"
                                onChange={this.formValChange} className="form-control"></textarea>
                        </div>
                        <div><span>Scheme Descrition</span>
                            <textarea value={this.state.scheme_desc} name="scheme_desc"
                                onChange={this.formValChange} className="form-control" ></textarea>
                            <span className="text-danger">{this.state.scheme_desc_error}</span>
                        </div>
                        {buttonsubmit}
                    </form>
                </div>
            </div>
        </div>);
    }
}
