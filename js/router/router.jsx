
import React, { Component } from 'react';
import { Router,Route,Link } from 'react-router-dom';
import Navbar from '../component/header/header';
import history from './history';
import Signup from '../component/signup/signup';
import Login from '../component/login/login';
import Dashboard from '../component/dashboard/dashboard'

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