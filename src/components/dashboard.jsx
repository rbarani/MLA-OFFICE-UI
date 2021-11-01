import React, { Component } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faWindowClose, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'
import UserService from '../services/user.services';

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dashboardData: {},
            departmentPetions: [],
            panchayatPetions: [],
            dashboardPanchayatWise: [],
            dashboardDepartmentWise: [],
        }
    }

    componentDidMount() {
        this.getTotalDashBoard();
        this.getDepartmentPetions();
        this.getPanchayatPetions();
        this.getDataPanchayatWise();
        this.getDataDepartmentWise();
    }

    getTotalDashBoard() {
        UserService.getTotalDashBoard()
            .then(res => {
                this.setState({ dashboardData: res.data[0] })
            });
    }

    getDataPanchayatWise() {
        UserService.getDataPanchayatWise()
            .then(res => {
                this.setState({ dashboardPanchayatWise: res.data })
            });
    }

    getDataDepartmentWise() {
        UserService.getDataDepartmentWise()
            .then(res => {
                this.setState({ dashboardDepartmentWise: res.data })
            });
    }

    getDepartmentPetions() {
        UserService.getDepartmentPetions()
            .then(res => {
                this.setState({ departmentPetions: res.data })
            });
    }

    getPanchayatPetions() {
        UserService.getPanchayatPetions()
            .then(res => {
                this.setState({ panchayatPetions: res.data })
            });
    }

    render() {
        const { dashboardData, departmentPetions, panchayatPetions, dashboardDepartmentWise, dashboardPanchayatWise } = this.state;
        const updatedData = [];
        departmentPetions.map(department =>
            updatedData.push({
                name: department.department,
                y: department.TotalDepartmentPetitions
            })
        );
        const updatedPanchayatData = [];
        panchayatPetions.map(panchayat =>
            updatedPanchayatData.push([panchayat.panchayat_name,
            panchayat.TotalPanchayatPetitions
            ])
        );
        const updatedPanchayatWiseData = [];
        const updatedPanchayatWiseDataPending = [];
        const updatedPanchayatWiseDataRejected = [];
        const updatedPanchayatWiseDataXAxis = [];
        dashboardPanchayatWise.map(panchayat =>
            updatedPanchayatWiseDataXAxis.push(panchayat.panchayat_name)
        );

        dashboardPanchayatWise.map(panchayat =>
            updatedPanchayatWiseData.push(panchayat.Solved)
        );

        dashboardPanchayatWise.map(panchayat =>
            updatedPanchayatWiseDataPending.push(panchayat.Pending)
        );

        dashboardPanchayatWise.map(panchayat =>
            updatedPanchayatWiseDataRejected.push(panchayat.Rejected)
        );

        const updatedDepartmentWiseData = [];
        const updatedDepartmentWiseDataPending = [];
        const updatedDepartmentWiseDataRejected = [];
        const updatedDepartmentWiseDataXAxis = [];
        dashboardDepartmentWise.map(department =>
            updatedDepartmentWiseDataXAxis.push(department.department)
        );

        dashboardDepartmentWise.map(department =>
            updatedDepartmentWiseData.push(department.Solved)
        );

        dashboardDepartmentWise.map(department =>
            updatedDepartmentWiseDataPending.push(department.Pending)
        );

        dashboardDepartmentWise.map(department =>
            updatedDepartmentWiseDataRejected.push(department.Rejected)
        );

        const options = {
            title: {
                text: 'Department PETITIONS'
            },
            series: [{
                type: 'pie',
                data: updatedData
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
                text: 'Most Complaint Panchayats'
            },
            subtitle: {
                text: '3D donut in Highcharts'
            },
            plotOptions: {
                pie: {
                    innerSize: 100,
                    depth: 45
                }
            },
            series: [{
                name: 'Panchayat',
                data: updatedPanchayatData
            }]
        }

        const optionsResolvedPanchayat = {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Solved / Unresolved Pettitions'
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                categories: updatedPanchayatWiseDataXAxis,
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Petitions Numbers'
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
                name: 'Solved',
                data: updatedPanchayatWiseData
            }, {
                name: 'Pending',
                data: updatedPanchayatWiseDataPending
            }, {
                name: 'Rejected',
                data: updatedPanchayatWiseDataRejected
            }]
        }
        const optionsResolved = {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Solved / Unresolved Pettitions'
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                categories:updatedDepartmentWiseDataXAxis,
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Petitions Numbers'
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
                name: 'Solved',
                data: updatedDepartmentWiseData
            }, {
                name: 'Pending',
                data: updatedDepartmentWiseDataPending
            }, {
                name: 'Rejected',
                data: updatedDepartmentWiseDataRejected
            }]
        }
        return (<div className="col main pt-5 mt-3">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item"><a href="#">Dashboard</a></li>
                    <li className="breadcrumb-item active" aria-current="page"></li>
                </ol>
            </nav>
            <div className='row'>
                <div className='col-sm-8'>
                    <p className="lead d-none d-sm-block">Constituency PETITIONS Details</p>

                </div>
                <div className='col-sm-4'>
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
            </div>

            <div className="row mb-3">
                <div className="col-xl-3 col-sm-6 py-2 card-design-dash">
                    <div className="card text-white">
                        <div className="card-body bg-info">
                            <div className="rotate-icon">
                                <FontAwesomeIcon icon={faCoffee} className="icon-dash" />
                            </div>
                            <div className="content-dash">
                                <h5>{dashboardData.TotalPetitions}</h5>
                                <p>Total Petitions</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-sm-6 py-2 card-design-dash">
                    <div className="card text-white">
                        <div className="card-body bg-success">
                            <div className="rotate-icon">
                                <FontAwesomeIcon icon={faThumbsUp} className="icon-dash solved" />
                            </div>
                            <div className="content-dash">
                                <h5>{dashboardData.Resolved}</h5>
                                <p>Solved Petitions</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-sm-6 py-2 card-design-dash">
                    <div className="card text-white bg-danger">
                        <div className="card-body">
                            <div className="rotate-icon">
                                <FontAwesomeIcon icon={faThumbsDown} className="icon-dash solved" />
                            </div>
                            <div className="content-dash">
                                <h5>{dashboardData.Pending}</h5>
                                <p>Pending Petitions</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-sm-6 py-2 card-design-dash">
                    <div className="card text-white bg-warning">
                        <div className="card-body">
                            <div className="rotate-icon">
                                <FontAwesomeIcon icon={faWindowClose} className="icon-dash solved" />
                            </div>
                            <div className="content-dash">
                                <h5>{dashboardData.Rejected}</h5>
                                <p>Rejected Petitions</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-xl-6 col-sm-6 py-2">
                    <h6 className="text-uppercase">Department Wise Total Petitions</h6>
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={options}
                    />
                </div>
                <div className="col-xl-6 col-sm-6 py-2">
                    <h6 className="text-uppercase">Solved/Unresolved Department wise</h6>
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={optionsResolved}
                    />
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-xl-6 col-sm-6 py-2">
                    <h6 className="text-uppercase">More Petitions Panchayat</h6>
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={optionsTotalPanchayat}
                    />
                </div>
                <div className="col-xl-6 col-sm-6 py-2">
                    <h6 className="text-uppercase">Solved/Unresolved Panchayat wise</h6>
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={optionsResolvedPanchayat}
                    />
                </div>
            </div>
        </div>)
    }

}