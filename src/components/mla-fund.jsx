import React, { Component } from 'react';
import UserService from '../services/user.services';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faMapMarker,faMoneyBill, faAlignJustify, faMapSigns, faCalendar, faWindowClose, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import dateFormat from 'dateformat';
export default class MlaFunds extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mlafundInfo: [],
            mlaDeptFund: [],
            mlaPanchayatDeptFund: [],
            mlaLowPanchayatDeptFund: []
        }
    }

    componentDidMount() {
        this.getMLAFund();
        this.getDepartmentFundUtilization();
        this.getPanchayatFundUtilization();
        this.getPanchayatLowFundUtilization();
    }

    getMLAFund() {
        UserService.getMLAFundInfo()
            .then(res => {
                this.setState({ mlafundInfo: res.data })
            });
    }

    getDepartmentFundUtilization() {
        UserService.getDepartmentFundUtilization()
            .then(res => {
                this.setState({ mlaDeptFund: res.data })
            });
    }

    getPanchayatFundUtilization() {
        UserService.getPanchayatFundUtilization()
            .then(res => {
                this.setState({ mlaPanchayatDeptFund: res.data })
            });
    }

    getPanchayatLowFundUtilization() {
        UserService.getPanchayatLowFundUtilization()
            .then(res => {
                this.setState({ mlaLowPanchayatDeptFund: res.data })
            });
    }

    render() {
        const { mlaDeptFund, mlaPanchayatDeptFund, mlaLowPanchayatDeptFund } = this.state;
        const updatedDepartmentFund = [];
        mlaDeptFund.map(department =>
            updatedDepartmentFund.push(department.fund_dept)
        );
        const funds = [];
        mlaDeptFund.map(department =>
            funds.push(department.total_dept_fund)
        );

        const mlaPanchayatDeptFundData = [];
        mlaPanchayatDeptFund.map(department =>
            mlaPanchayatDeptFundData.push([department.panchayat_name, department.total_panchayat_fund])
        );

        const mlaPanchayatLowDeptFundData = [];
        mlaLowPanchayatDeptFund.map(department =>
            mlaPanchayatLowDeptFundData.push([department.panchayat_name, department.total_panchayat_fund])
        );
        const options = {
            title: {
                text: 'Union wise fund Utilizations'
            },
            series: [{
                type: 'pie',
                data: [{
                    name: 'Thiruvidaimaruthur',
                    y: 5000000
                }, {
                    name: 'Thirupananthal',
                    y: 6000000
                }, {
                    name: 'Kumbakonam',
                    y: 1000000
                }]
            }]
        }
        const optionsData = {
            chart: {
                type: 'pie',
                options3d: {
                    enabled: true,
                    alpha: 45
                }
            },
            title: {
                text: 'Low Fund Used Panchayats'
            },
            subtitle: {
                text: ''
            },
            plotOptions: {
                pie: {
                    innerSize: 100,
                    depth: 45
                }
            },
            series: [{
                name: 'Panchayat',
                data: mlaPanchayatLowDeptFundData
            }]
        }

        const optionsTotalPanchayat = {
            chart: {
                type: 'pie',
                options3d: {
                    enabled: true,
                    alpha: 45
                }
            },
            title: {
                text: 'High Fund Used Panchayats'
            },
            subtitle: {
                text: ''
            },
            plotOptions: {
                pie: {
                    innerSize: 100,
                    depth: 45
                }
            },
            series: [{
                name: 'Panchayat',
                data: mlaPanchayatDeptFundData
            }]
        }

        const optionsResolved = {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Department Wise fund Used'
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                categories: updatedDepartmentFund,
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Amount in Millions'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [{
                name: 'Fund',
                data: funds
            }]
        }

        return (<div className="col main pt-5 mt-3">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item"><a href="">MLA Funds</a></li>
                    <li className="breadcrumb-item active" aria-current="page"></li>
                </ol>
            </nav>
            <div className='container'>

                <div className='container'>
                    <div className='row'>
                        <div className='col-sm-6'>
                            <form>
                                <div className="form-group">
                                    <select className="form-control" id="sel1">
                                        <option>ALL</option>
                                        <option>2021</option>
                                        <option>2020</option>
                                        <option>2019</option>
                                        <option>2018</option>
                                        <option>2017</option>
                                    </select>
                                </div>
                            </form>
                        </div>
                        <div className='col-sm-6'>
                            <Link to={{ pathname: '/mlafunds/addmlafunds', state: { method: 'add' } }} className='btn btn-clr-default btn-block'>Add Mla Fund</Link>
                        </div>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-xl-4 col-sm-12 py-2">
                        <div className="card bg-info text-white h-100">
                            <div className="card-body bg-info" style={{ backgroundColor: "#57b960" }}>
                                <div className="rotate">
                                    <i className="fa fa-user fa-4x"></i>
                                </div>
                                <h6 className="text-uppercase">Total Fund</h6>
                                <h6>15,00,00,00</h6>
                                <p>Fifteen Crores only</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-sm-12 py-2">
                        <div className="card text-white bg-success h-100">
                            <div className="card-body bg-success">
                                <div className="rotate">
                                    <i className="fa fa-list fa-4x"></i>
                                </div>
                                <h6 className="text-uppercase">Utilized Fund</h6>
                                <h6>12,00,00,00</h6>
                                <p>Twelve Crores only</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-sm-12 py-2">
                        <div className="card text-white bg-danger h-100">
                            <div className="card-body bg-danger">
                                <div className="rotate">
                                    <i className="fab fa-twitter fa-4x"></i>
                                </div>
                                <h6 className="text-uppercase">Remaining Fund</h6>
                                <h6>3,00,00,00</h6>
                                <p>Three Crores only</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-xl-6 col-sm-6 py-2">
                        <h6 className="text-uppercase">Union wise fund utilizations</h6>
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={options}
                        />
                    </div>
                    <div className="col-xl-6 col-sm-6 py-2">
                        <h6 className="text-uppercase">Solved/Unresolved Department wise</h6>
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={optionsTotalPanchayat}
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-xl-6 col-sm-6 py-2">
                        <h6 className="text-uppercase">More Petitions Panchayat</h6>
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={optionsData}
                        />
                    </div>
                    <div className="col-xl-6 col-sm-6 py-2">
                        <h6 className="text-uppercase"></h6>
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={optionsResolved}
                        />
                    </div>
                </div>
                <div className='row'>

                    <div className='col-sm-12'>
                        <p className="lead d-none d-sm-block">MLA Funds Details</p>
                        {this.state.mlafundInfo.map((mlafund, index) =>
                            <div className='mla-funds'>
                                <Link to={{ pathname: '/mlafunds/addmlafunds', state: { mlafundInfo: mlafund.m_id, method: 'edit' } }}> <div className='funds' key={mlafund.m_id}>
                                    <h2>{mlafund.scheme_title}</h2>
                                    <span className='fund-details'><FontAwesomeIcon icon={faMapMarker} /> {mlafund.panchayat_name}  <span><FontAwesomeIcon icon={faMoneyBill} /> {mlafund.mla_fund}</span> <span> <FontAwesomeIcon icon={faCalendar} /> {mlafund.scheme_year}</span></span>
                                    <p>{mlafund.scheme_desc}</p>
                                   
                                
                                </div>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>)
    }
}