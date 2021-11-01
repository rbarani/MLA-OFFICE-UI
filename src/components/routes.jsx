import React from "react";
import { Component } from "react";
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import Dashboard from '../../src/components/dashboard';
import PetitionsLists from '../../src/components/petition-lists';
import AddPetitions from '../../src/components/add-petitions';
import Panchayat from '../../src/components/panchayat';
import MlaFunds from '../../src/components/mla-fund';
import AddMlaFunds from '../../src/components/add-mlafunds';
import AddPanchayat from '../../src/components/add-panchayat';


export default class Routes extends Component {
    render() {
        return (<BrowserRouter>
            <Switch>
                <Route path="/" exact component={Dashboard} />
                <Route path="/petitions-list" exact component={PetitionsLists} />
                <Route path="/petitions-list/add-petitions" component={AddPetitions} />
                <Route path="/panchayat/add-panchayat" component={AddPanchayat} />
                <Route path="/mla-funds" component={MlaFunds} />
                <Route path="/mlafunds/addmlafunds" component={AddMlaFunds} />
                <Route path="/panchayat/add-panchayat" component={AddPanchayat} />
                <Route path="/panchayat" component={Panchayat} />
            </Switch>
        </BrowserRouter>)
    }
}

