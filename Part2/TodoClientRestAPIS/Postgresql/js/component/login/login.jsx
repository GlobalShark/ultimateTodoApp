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
import DocumentTitle from 'react-document-title'

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
        this.changeLoginPath = this.changeLoginPath.bind(this)
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
      //userName:this.state.userName,
      email:this.state.email,
      password:this.state.password,
    }     
    const user = userData

    axios.post(`http://localhost:5050/loginuser`, { user })

      .then(res => {
        console.log("then",res);
        if(res.data === 'success'){
          this.props.loginsucces()
          axios.get('http://localhost:5050/logginUserData')
           .then(response => {
             console.log('Res dtaa',response.data.uid)
             const {token} = response.data.uid
             sessionService.saveSession({ token }).then(()=>{
              sessionService.saveUser(response.data).then(()=>{
                history.replace('/dashboard')
              })
            })
            //  history.replace('/dashboard')
             })
  .catch(error => {
    console.log('Error fetching and parsing data', error);
  });
        }else{
          this.props.loginFailed()
        }

         responsedata = res.data
         this.state.loginSuccess =responsedata
         
      }).catch((error)=>{
        this.props.loginFailed(error)
        console.log('Error checking',error)
       })




  }
  changeLoginPath(){
    history.push('/signup')
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
                  <div className="all-wrapper menu-side with-pattern">
                    <div className="auth-box-w wider">
                      <div className="logo-w">
                        <a href="#"><img src='dist/img/todo.png'/></a>
                      </div>
                      <h3 className="auth-header" id="authHeader">
                        Welcome ToDo App 
                      </h3>
                      <form action="" method="POST">
                        <div className="form-group">

                          <label htmlFor="">Username</label><input onChange={this.signupInputHandler} id="name" name="email" required="required" className="form-control" placeholder="Enter your username" type="text"/>
                        
                          <div className="pre-icon os-icon os-icon-user-male-circle"></div>
                        </div>
                        <div className="form-group">
                        
                          <label htmlFor="">Password</label><input onChange={this.signupInputHandler} id="password" name = "password" required="required" className="form-control" placeholder="Enter your password" type="password"/>
                        
                          <div className="pre-icon os-icon os-icon-fingerprint"></div>
                        </div>

                        {/* <TextField required label="Email" placeholder="Email" id="signupinput" defaultValue="1" className={styles.textField} onChange={this.signupInputHandler}  name="email"/>
                        <TextField required type="password" label="Password" placeholder="Password" id="signupinput" defaultValue="" onChange={this.signupInputHandler} className={styles.textField}  name="password"/> */}


                        <div className="buttons-w">
                          <button className="btn btn-primary" onClick={this.handleSubmit} type="submit" name="submit" >Log me in</button>
                        </div>
                        <div className="form-message">
                        </div>
                      </form>
                        <div className="buttons-w signup-w" >
                          <div className="form-check-inline">
                            <label className="form-check-label">Create Account</label> &nbsp;
                          <a className="btn btn-secondary" href="#"  onClick={this.changeLoginPath} >Sign Up</a>
                        </div>
                      </div>
                    </div>
                  </div>
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


document.addEventListener('DOMContentLoaded',function(event){
  // array with texts to type in typewriter
  var dataText = [ "Welcome To ToDo App","Create Your Account", "Or ", "Login To Continue"];
  
  // type one text in the typwriter
  // keeps calling itself until the text is finished
  function typeWriter(text, i, fnCallback) {
      // chekc if text isn't finished yet
      if (i < (text.length)) {
      // add next character to h1
      document.getElementById("authHeader").innerHTML = text.substring(0, i+1) +'<span aria-hidden="true"></span>';

      // wait for a while and call this function again for next character
      setTimeout(function() {
          typeWriter(text, i + 1, fnCallback)
      }, 100);
      }
      // text finished, call callback if there is a callback function
      else if (typeof fnCallback == 'function') {
      // call callback after timeout
      setTimeout(fnCallback, 700);
      }
  }
  // start a typewriter animation for a text in the dataText array
  function StartTextAnimation(i) {
      if (typeof dataText[i] == 'undefined'){
          setTimeout(function() {
          StartTextAnimation(0);
          }, 20000);
      }
      // check if dataText[i] exists
      if (i < dataText[i].length) {
          
      var msg = new SpeechSynthesisUtterance();
      var voices = window.speechSynthesis.getVoices();
      msg.voice = voices[2];
      msg.text = dataText[i];
      speechSynthesis.speak(msg);

      // text exists! start typewriter animation
      typeWriter(dataText[i], 0, function(){
      // after callback (and whole text has been animated), start next text
      StartTextAnimation(i + 1);
      });
      }
  }
  // start the text animation
  StartTextAnimation(0);
  });


Login.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default connect(mapStateToProp,mapDispatchToProps)(withStyles(styles)(Login));