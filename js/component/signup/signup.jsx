import React,{Component} from "react";
import DocumentTitle from 'react-document-title'
import PropTypes from 'prop-types';//We used proptypes to integrate Styles with our class
import { withStyles } from '@material-ui/core/styles';
import TextField from 'material-ui/TextField';
import Radio,{ RadioGroup } from 'material-ui/Radio';
import { FormLabel, FormControl, FormControlLabel, FormHelperText } from 'material-ui/Form';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import { LinearProgress } from 'material-ui/Progress';//Loading material ui
import Typography from '@material-ui/core/Typography'
import './signup.css'
import axios from 'axios';
import history from '../../router/history';
import login_signup_action from '../store/actions/login_signup_action';
import { connect } from 'react-redux';



const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      paddingLeft:50,
    },
    textField: {
      marginLeft: `${theme.spacing.unit}px 0`,
      // paddingLeft:50,
      // marginRight: theme.spacing.unit,
      width: '100',
    },
    button: {
        margin: theme.spacing.unit,
      },
      formControl: {
        margin: theme.spacing.unit * 3,
      },
      group: {
        margin: `${theme.spacing.unit}px 0`,
      },
      progress: {
        margin: `0 ${theme.spacing.unit * 2}px`,
      },
  });


class Signup extends Component{
    constructor(props){
        super(props)
        this.state={
          userName:'',
            email:'',
            password:'',
            age:undefined,
            gender:null,
            joiningdate:undefined,
            errormessage:false,
            registerSuccess:undefined,
            snackbaropen:false,
        }
        this.classes={props}
        this.signupInputHandler = this.signupInputHandler.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.closeSnackbar =  this.closeSnackbar.bind(this)
        this.changeLoginPath = this.changeLoginPath.bind(this)
    }
    signupInputHandler(ev){
      ev.preventDefault()
      var date = new Date();
      this.setState({
          [ev.target.name]:ev.target.value.toLowerCase(),
          joiningdate:date.toUTCString()
      })
      console.log("state",this.state)
  }
  handleSubmit(ev,dispatch){
    ev.preventDefault();
    this.props.signup()
    var responsedata = ''
    var userData = {
      userName:this.state.userName,
      email:this.state.email,
      password:this.state.password,
      age:this.state.age,
      gender:this.state.gender,
      joiningdate:this.state.joiningdate
    }     
    const user = userData

    axios.post('http://localhost:5050/registeruser', { user })

      .then(res => {
        console.log("then",res);
        if(res.data === 'success'){
          console.log('Resdat',this.props.login_signup_reducer.loading)
          var changePath = history.replace('/')
          setTimeout(changePath,5000)
          this.props.signupsucces()

        }

         responsedata = res.data
         this.state.registerSuccess =responsedata
         
      }).catch((error)=>{
        this.props.signupFailed(error)
        console.log('Error checking',error)
       })



  }
  changeLoginPath(){
    history.push('/')
  }

  // close snackbar
  closeSnackbar(){
    this.setState({
      snackbaropen:false
    })
  }
    render(){
        const { classes } = this.props;
        return(
            <div className="signupContainer">
            {(this.props.session.authenticated)?( history.replace('/dashboard') ):( 
              <div>
                {(this.props.session.user.length === 0)?( history.replace('/dashboard') ):(
            <div>
                {(this.props.login_signup_reducer.loading)? <LinearProgress variant="query" />:''}
                {
                  console.log('Singp reducer',this.props.login_signup_reducer.loading)
                }
                {(this.props.login_signup_reducer.error)?
              this.state.snackbaropen = true
              :
              this.state.snackbaropen=false
              }
              <Snackbar anchorOrigin={{ vertical:'top', horizontal:'left' }} open={this.state.snackbaropen}  SnackbarContentProps={{ 'aria-describedby': 'message-id', }} message={<span onClick={this.closeSnackbar} id="firebaseformchecking">{this.props.login_signup_reducer.errorMessage}</span>} />                  
                <div className="all-wrapper menu-side with-pattern">
                  <div className="auth-box-w wider">
                    <div className="logo-w">
                      <a href="index.html"><img alt="" src="dist/img/todo.png"/></a>
                    </div>
                    <h3 className="auth-header">
                      Create Account
                    </h3>
                    <form action="signup-try.php" method="post" >
                      <div className="form-group">
                        <label htmlFor=""> User Name </label><input className="form-control" placeholder="Enter UserName" type="text" required  onChange={this.signupInputHandler} name="userName"/>
                        <div className="pre-icon icon-user"></div>
                      </div>
                      <div className="form-group">
                        <label htmlFor=""> Email address</label><input name="email" required="required" className="form-control" placeholder="Enter email" type="email" onChange={this.signupInputHandler}/>
                        <div className="pre-icon os-icon os-icon-email-2-at2"></div>
                      </div>
                      <div className="row">
                        <div className="col-sm-12">
                          <div className="form-group">
                            <label htmlFor=""> Password</label><input name="password" required="required" className="form-control" placeholder="Password" type="password" onChange={this.signupInputHandler}/>
                            <div className="pre-icon os-icon os-icon-fingerprint"></div>
                          </div>
                        </div>
                        {/* <div className="col-sm-6">
                          <div className="form-group">
                            <label htmlFor="">Confirm Password</label><input className="form-control" placeholder="Password" type="password"/>
                          </div>
                        </div> */}
                      </div>
                      <div className="buttons-w">
                        <button className="btn btn-primary" onClick={this.handleSubmit}>Register Now</button> &nbsp;
                            <label className="form-check-label" onClick={this.changeLoginPath} >Login To Continue</label>
                      </div>
                    </form>
                  </div>
                </div>
                </div>
                )}
                </div>
            )}
            </div>
        )
    }
}

function mapStateToProp(state) {
  return {
      login_signup_reducer : state.login_signup_reducer,
      session:state.session
  }
}
//Map Dispatch to Props
function mapDispatchToProps(dispatch){
  return{
      signup:(userInfo)=>{
          dispatch(login_signup_action.register())
      },
      signupsucces:(userInfo)=>{
         dispatch(login_signup_action.register_success())
      },
      signupFailed:(error)=>{
        dispatch(login_signup_action.register_failed(error))
      }
  }
}

Signup.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default connect(mapStateToProp,mapDispatchToProps)(withStyles(styles)(Signup));