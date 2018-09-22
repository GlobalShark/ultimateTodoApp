
import React, { Component } from 'react';
import { Router,Route,Link } from 'react-router-dom';
import Navbar from '../components/header/header';
import history from './history';
import Signup from '../components/signup/signup';
import Login from '../components/login/login';
import Dashboard from '../components/dashboard/dashboard'

class Routers extends Component{
    render(){
        return(
            <Router history={history}>
            <div>
                <Navbar />
                <Route exact path="/" component={Signup} />
                <Route  path="/login" component={Login} />
                <Route path='/dashboard' component={Dashboard} />
                </div>
            </Router>
        )
    }
}
export default Routers;