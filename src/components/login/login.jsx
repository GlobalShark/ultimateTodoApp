import React,{Component} from "react";
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
import './login.css'
import axios from 'axios';
import history from '../../router/history';
import login_signup_action from '../store/actions/login_signup_action';
import { connect } from 'react-redux';
import { sessionService } from 'redux-react-session'
import DocumentTitle from 'react-document-title';
import * as firebase from 'firebase';
import {db} from '../../index';


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


class Login extends Component{
    constructor(props){
        super(props)
        this.state={
          userName:'',
            email:'',
            password:'',
            errormessage:false,
            loginSuccess:undefined,
            snackbaropen:false,
        }
        this.classes={props}
        this.signupInputHandler = this.signupInputHandler.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.closeSnackbar =  this.closeSnackbar.bind(this)
    }
    signupInputHandler(ev){
      ev.preventDefault()
      var date = new Date();
      this.setState({
          [ev.target.name]:ev.target.value.toLowerCase(),
          joiningdate:date.toUTCString()
      })
      // console.log("state",this.state)
  }
  handleSubmit(ev){
    ev.preventDefault();
    this.props.login()
    var responsedata = ''
    var userData = {
      userName:this.state.userName,
      email:this.state.email,
      password:this.state.password,
    }     
    const user = userData

  //   axios.post(`http://localhost:5050/loginuser`, { user })

  //     .then(res => {
  //       console.log("then",res);
  //       if(res.data === 'success'){
  //         this.props.loginsucces()
  //         axios.get('http://localhost:5050/logginUserData')
  //          .then(response => {
  //            console.log('Res dtaa',response.data.uid)
  //            const {token} = response.data.uid
  //            sessionService.saveSession({ token }).then(()=>{
  //             sessionService.saveUser(response.data).then(()=>{
  //               history.replace('/dashboard')
  //             })
  //           })
  //           //  history.replace('/dashboard')
  //            })
  // .catch(error => {
  //   console.log('Error fetching and parsing data', error);
  // });
  //       }else{
  //         this.props.loginFailed()
  //       }

  //        responsedata = res.data
  //        this.state.loginSuccess =responsedata
         
  //     }).catch((error)=>{
  //       this.props.loginFailed(error)
  //       console.log('Error checking',error)
  //      })
    //login with firebase auth

     let that = this;
    firebase.auth().signInWithEmailAndPassword(userData.email, userData.password)
    .then((succ)=>{
      console.log('FROM FIREBASE AUTH')
      console.log(succ)
      //using local storage for storing user uid
      localStorage.setItem('ultimatetodo-user-id', succ.user.uid)
      
        //getting data from firestore
        db.collection("users").doc(succ.user.uid)
        .onSnapshot(function(doc) {
          var userData = doc.data();
            console.log("Current data: ", userData);

             // calling previous functions
        that.props.loginsucces();
        const {token} = succ.user.uid
                   sessionService.saveSession({ token }).then(()=>{
                    console.log("IN SESSION")
                    console.log(token)
                      sessionService.saveUser(userData).then(()=>{
                        console.log("IN SESSION")

                        

                        history.replace('/dashboard')
                      })
                    })
                  })
                    
       
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log('FROM FIREBASE AUTH')
      console.log(error)
      that.props.loginFailed(error);
      // ...
    });



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
          <DocumentTitle title="Login">
            <div className="signupContainer">
            {(this.props.session.authenticated)?( history.replace('/dashboard') ):(  
            <div>
              {(this.props.login_signup_reducer.loading)? <LinearProgress variant="query" />:''}
              {(this.props.login_signup_reducer.error)?
              this.state.snackbaropen = true
              :
              this.state.snackbaropen=false
              }
<Snackbar anchorOrigin={{ vertical:'top', horizontal:'left' }} open={this.state.snackbaropen}  SnackbarContentProps={{ 'aria-describedby': 'message-id', }} message={<span onClick={this.closeSnackbar} id="firebaseformchecking">Email or Password is incorrect</span>} />
                <div className="signupForm">
                <div className="signupinsidebox">
                <h3 className="signuptxt">Login</h3>
                <form method="POST" className={styles.container} noValidate autoComplete="off" >
                <TextField required label="Email" placeholder="Email" id="signupinput" defaultValue="" className={styles.textField} onChange={this.signupInputHandler}  name="email"/>
                <TextField required type="password" label="Password" placeholder="Password" id="signupinput" defaultValue="" onChange={this.signupInputHandler} className={styles.textField}  name="password"/>
                <Button color="primary" onClick={this.handleSubmit} id="loginbtn" className={styles.button}>Login</Button>
                </form>
                </div>
                </div>
                <p className="signupnote"><b>Note:</b> You need to Login to add todos</p>
                </div>
            )}
            </div>
            </DocumentTitle>
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
      login:(userInfo)=>{
          dispatch(login_signup_action.login())
      },
      loginsucces:(userInfo)=>{
         dispatch(login_signup_action.login_Success())
      },
      loginFailed:(error)=>{
        dispatch(login_signup_action.login_Failed(error))
      }
  }
}


Login.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default connect(mapStateToProp,mapDispatchToProps)(withStyles(styles)(Login));