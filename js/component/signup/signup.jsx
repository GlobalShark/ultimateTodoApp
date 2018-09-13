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

    axios.post(`http://localhost:5050/registeruser`, { user })

      .then(res => {
        console.log("then",res);
        if(res.data === 'success'){
          console.log('Resdat',this.props.login_signup_reducer.loading)
          var changePath = history.replace('/login')
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
                <div className="signupForm">
                <div className="signupinsidebox">
                <h3 className="signuptxt">Signup</h3>
                <form method="POST" className={styles.container} noValidate autoComplete="off" >
                <TextField required label="UserName" placeholder="UserName" id="signupinput" defaultValue="" onChange={this.signupInputHandler} className={styles.textField} helperText="Example: John"  name="userName"/>
                <TextField required label="Email" placeholder="Email" id="signupinput" defaultValue="" className={styles.textField} onChange={this.signupInputHandler} helperText="Example: abc@abc.com"  name="email"/>
                <TextField required type="password" label="Password" placeholder="Password" id="signupinput" defaultValue="" onChange={this.signupInputHandler} className={styles.textField} helperText="Atleast 6 Character Required"  name="password"/>
                <TextField id="signupinput" label="Birthday" type="date" className={styles.textField} onChange={this.signupInputHandler} InputLabelProps={{ shrink: true, }}  name="age" /> 
                <FormLabel id="signupchecboxtxt" component="legend">Gender</FormLabel>
                <RadioGroup aria-label="gender" name="gender" id="signupcheckbox" value={this.state.gender} onChange={this.signupInputHandler} className={styles.group} >
                  <FormControlLabel  value="male" control={<Radio />} label="Male" name="male"/>
                  <FormControlLabel  value="female" control={<Radio />} label="Female" name="female"/>
                </RadioGroup>
                <Button color="primary" onClick={this.handleSubmit} id="signupinput" className={styles.button}>Signup</Button>
                </form>
                </div>
                </div>
                <p className="signupnote"><b>Note:</b> You need to signup to add todos</p>
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