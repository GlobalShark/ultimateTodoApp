import React from 'react'
import {
  Router,
  Route
} from 'react-router-dom';

import history from '../History';
import ButtonAppBar from '../components/AppBar';
import Signin from '../containers/signin';
import Signup from '../containers/signup';
import TodoContainer from '../containers/todo';
// import signup from '../containers/signup';

const ParentApp = () => (
  <div>
    {/* App routing goes here!! */}
    <ButtonAppBar />
    <Route exact path="/" component={Signin} /> 
    <Route exact path="/signup" component={Signup} />
    <Route exact path="/signin" component={Signin} /> 
    <Route exact path="/dashboard" component={TodoContainer} />

  </div>
);

const AppRoutes = () => {
  return (
    <Router history={history}>
      <Route component={ParentApp} />
    </Router>
  )
};

export default AppRoutes;