import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UserService from '../services/user.services';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
export default class Panchayat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            panchayat: [],
            panchayat_id: '',
            method: ""
        }
        this.getPanchayatDetails();
    }

    getPanchayatDetails() {
        UserService.getPanchayatInfo()
            .then(res => {
                this.setState({ panchayat: res.data });
                console.log(this.state.panchayat);
            })
    }

    render() {
        const options = {
            title: {
                text: ''
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
                text: ''
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
                data: [
                    ['Aralur', 8],
                    ['Pandanllur', 3],
                    ['Anaikarai', 1],
                    ['Kathiramangalam', 6],
                    ['Anaikudi', 8],
                    ['Thirumangalkudi', 3],
                    ['Narasingapetai', 4],
                    ['Vellore', 1],
                    ['Kanjanoor', 1]
                ]
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
                text: ''
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
                data: [
                    ['Aralur', 8],
                    ['Pandanllur', 3],
                    ['Anaikarai', 1],
                    ['Kathiramangalam', 6],
                    ['Anaikudi', 8],
                    ['Thirumangalkudi', 3],
                    ['Narasingapetai', 4],
                    ['Vellore', 1],
                    ['Kanjanoor', 1]
                ]
            }]
        }

        const optionsResolved = {
            chart: {
                type: 'column'
            },
            title: {
                text: ''
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                categories: [
                    'Thirupanandal',
                    'Thiruvidaimaruthur',
                    'Kumbakonam'

                ],
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Rainfall (mm)'
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
                name: 'General Panchayat',
                data: [9.9, 7.5, 106.4]
            }, {
                name: 'Women',
                data: [4.9, 81.5, 54]
            }, {
                name: 'Schedule Caste',
                data: [49.9, 7.5, 4.4]
            }, {
                name: 'Women Schedule Caste',
                data: [59.9, 45.5, 7.4]
            }]
        }
        return (
            <div className="col main pt-5 mt-3">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                        <li className="breadcrumb-item"><a href="#">Panchayat Details</a></li>
                        <li className="breadcrumb-item active" aria-current="page"></li>
                    </ol>
                </nav>
                <div className='container'>
                    <div className='row'>
                        <div className='col-sm-12'>
                            <Link to={{ pathname: '/panchayat/add-panchayat', state: { method: 'add' } }} className='btn btn-clr-default btn-block'>Add Panchayat</Link>
                        </div>
                    </div>

                    <div className='row panchayat-details'>
                        <div className='col-sm-6'>
                            <p>Total Papulation:350000</p>
                            <p>Total Male Papulation:175000</p>
                            <p>Total Female Papulation:125000</p>
                            <p>Total Voters:225000</p>
                            <p>Total Male Voters:125000</p>
                            <p>Total Female Voters:100000</p>

                        </div>
                        <div className='col-sm-6'>
                            <p>Total Unions:3</p>
                            <p>Total Panchayats:110</p>
                            <p>Total Total Wards:1200</p>
                            <p>Total Schedule Panchayat:35</p>
                            <p>Total General Panchayat:65</p>
                            <p>Total Women Panchayats:10</p>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-xl-6 col-sm-6 py-2">
                            <h6 className="text-uppercase">Union Wise Voters</h6>
                            <HighchartsReact
                                highcharts={Highcharts}
                                options={options}
                            />
                        </div>
                        <div className="col-xl-6 col-sm-6 py-2">
                            <h6 className="text-uppercase">Highest Voters Panchayats</h6>
                            <HighchartsReact
                                highcharts={Highcharts}
                                options={optionsTotalPanchayat}
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-xl-6 col-sm-6 py-2">
                            <h6 className="text-uppercase">Lowest Voters Panchayats</h6>
                            <HighchartsReact highcharts={Highcharts} options={optionsData} />
                        </div>
                        <div className="col-xl-6 col-sm-6 py-2">
                            <h6 className="text-uppercase">Panchayat Category UnionWise</h6>
                            <HighchartsReact
                                highcharts={Highcharts}
                                options={optionsResolved}
                            />
                        </div>
                    </div>
                    {this.state.panchayat.map((info, index) => <Link className='panchayat-name' to={{ pathname: '/panchayat/add-panchayat', state: { panchayat: this.state.panchayat, panchayat_id: info.panchayat_id, method: 'edit' } }}>  <div className='row  panchayat-lists'>
                        <div className='col-sm-4'>
                            <h4>Name:{info.panchayat}</h4>
                            <h5>Union:{info.panchayat_union}</h5>
                            <h6>President:{info.panchayat_president}</h6>
                            <h6>Cleark:{info.panchayat_clerk}</h6>
                            <h6>VAO:{info.panchayat_vao}</h6>
                            <p>Type:{info.panchayat_category}</p>
                        </div>
                        <div className='col-sm-4'>
                            <h5>Rations:{info.total_rations}</h5>
                            <h5>Wards:{info.total_wards}</h5>
                            <h5>Total SQFT:78544</h5>
                            <h5>Schools Available</h5>
                            <h5>Health Center</h5>
                            <h5>TNC</h5>
                        </div>
                        <div className='col-sm-4'>
                            <h4>Papulation:{info.panchayat_papulation}</h4>
                            <h4>Male:{info.panchayat_male}</h4>
                            <h5>Female:{info.panchayat_female}</h5>
                            
                            <h6>Male Voters:{info.panchayat_male_voters}</h6>
                            <h6>Female Voters:{info.panchyat_female_voters}</h6>
                        </div>
                <div><h6>Needs:Bus Stop,Colleges,Bridges</h6>
               
                </div>
                    </div>   </Link>)}
                </div>
            </div>
        )
    }
}
