import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import './header.css'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import login_signup_action from '../store/actions/login_signup_action'
import { sessionService } from 'redux-react-session';
import history from '../../router/history'
import axios from 'axios';

const styles = {
    root: {
      flexGrow: 1,
    },
    flex: {
      flexGrow: 1,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
  };

class Navbar extends Component{
    constructor(props){
        super(props)
       
        this.logout = this.logout.bind(this)
    }
    logout(){
      // console.log('My logout func',this.props.session.user.uid)
      var logout = {
        uid:this.props.session.user.uid
      }
      axios.post(`http://localhost:5050/logoutUser`, { logout }).then(res => {
        console.log("then",res);
        this.props.logout()
        sessionService.deleteSession();
        sessionService.deleteUser();
        history.replace('/login');         
      })
    }
    render(){
        const { classes } = this.props;
        return(
            <div className={classes.root}>
            {/* <AppBar position="static">
              <Toolbar>
                <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                </IconButton>
                <Typography variant="title" color="inherit" className={classes.flex}>
                  Todo App
                </Typography>
                {
                  (this.props.session.authenticated)?
                  <div>
                  <Link to="/"><Button color="inherit" id="signupbtn">Home</Button></Link>
                  <Button id="signupbtn" color="inherit" onClick={this.logout}>Logout</Button>
                  </div>
                  :
                  <div>
                <Link to="/"><Button color="inherit" id="signupbtn">Signup</Button></Link>
                <Link to="/login"><Button id="signupbtn" color="inherit">Login</Button></Link>
                  </div>
                }
              </Toolbar>
            </AppBar> */}
          </div>
        )
    }
}

function mapStateToProps(state){
  return{
    login_signup_reducer:state.login_signup_reducer,
    session:state.session
  }
}

function mapDispatchToProps(dispatch){
  // console.log('this  props',this.props)
  return{
    logout:()=>{
    dispatch(login_signup_action.logout())
    }
  }
}
Navbar.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Navbar));