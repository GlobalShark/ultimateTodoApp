import React, { Component } from "react";
import DocumentTitle from 'react-document-title'
import PropTypes from 'prop-types';//We used proptypes to integrate Styles with our class
import { withStyles } from '@material-ui/core/styles';
// import TextField from 'material-ui/TextField';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormLabel, FormControl, FormControlLabel, FormHelperText } from 'material-ui/Form';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import { LinearProgress } from 'material-ui/Progress';//Loading material ui
import Typography from '@material-ui/core/Typography'
import './dashboard.css'
import axios from 'axios';
import history from '../../router/history';
import login_signup_action from '../store/actions/login_signup_action';
import { connect } from 'react-redux';
import keycode from 'keycode';
import Downshift from 'downshift';
import TextField from '@material-ui/core/TextField';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';
import Autosuggest from 'react-autosuggest';
import { sessionService } from 'redux-react-session';



const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        paddingLeft: 50,
    },
    textField: {
        marginLeft: `${theme.spacing.unit}px 0`,
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
// Sugesstion
var languages = [
    {
        name: 'C',
        year: 1972
    },
    {
        name: 'Elm',
        year: 2012
    },
]

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : languages.filter(lang =>
        lang.name.toLowerCase().slice(0, inputLength) === inputValue
    );
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.name;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
    <div>
        {suggestion.name}
    </div>
);


class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            todo: '',
            todosList: undefined,
            description: '',
        }
        this.classes = { props }
        this.signupInputHandler = this.signupInputHandler.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.closeSnackbar = this.closeSnackbar.bind(this)
        this.logout = this.logout.bind(this)
    }
    signupInputHandler(ev) {
        ev.preventDefault()
        var date = new Date();
        this.setState({
            [ev.target.name]: ev.target.value.toLowerCase(),
            joiningdate: date.toUTCString()
        })
        console.log("state", this.props.session.user.uid)
    }
    handleSubmit(ev) {
        ev.preventDefault();
        var responsedata = ''
        var userData = {
            todo: this.state.todo,
            description: this.state.description,
            uid: this.props.session.user.uid
        }
        const user = userData

        axios.post(`http://localhost:5050/addtodos`, { user })

            .then(res => {
                console.log("then", res);
                if (res.data === 'success') {
                    console.log('perfect')

                }

                responsedata = res.data
                this.state.registerSuccess = responsedata

            }).catch((error) => {
                this.props.signupFailed(error)
                console.log('Error checking', error)
            })
    }

    componentDidMount() {
        var userData = undefined
        axios.get('/fetchtodoapi/v1.0')
            .then(function (response) {
                console.log('myresponse todo', response);
                return response
                // this.setState({ todosList: response.data })
                //   this.state.todosList = response
                // .then((responseText) => responseText.json())
                // .then((response) => this.setState(response));
            }).then((res) => {
                console.log('2nd then', res)
                this.setState({ todosList: res.data })
            })
            .catch(function (error) {
                console.log(error);
            });
        console.log('after fetchtodoapi', userData)
        this.setState({ todosList: userData })
    }
    // Component Update
    // componentWillUpdate(){
    //     axios.get('/fetchtodoapi/v1.')
    //     .then(function (response) {
    //       console.log('myresponse todo',response);
    //       this.state.todosList = response

    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     });
    // }

    // close snackbar
    closeSnackbar() {
        this.setState({
            snackbaropen: false
        })
    }
    // Logout
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
          history.replace('/');         
        })
      }
    render() {
        const { classes } = this.props;
        var todosList = this.state.todosList
        // console.log('mymymymTodolist', todosList)
        return (
            <DocumentTitle title="Dashboard">
                <div className="signupContainer">
                    {(this.props.session.authenticated) ? (
                        <div>
                            {(this.props.session.user.length === 0) ? (history.replace('/dashboard')) : (
                                <div>
                                    {/* <p variant="display1" gutterBottom style={{ marginLeft: 50, marginTop: 10 }}>Joined Date {this.props.session.user.joiningdate}</p>
                                    <Typography variant="display1" gutterBottom style={{ textAlign: 'center', marginTop: 10 }}>Welcome {this.props.session.user.username}</Typography>
                                    <div id="tododiv">
                                        <TextField required label="Add Todos" placeholder="Add Todos" id="signupinput" defaultValue="" helperText="Example: Going to Jym" onChange={this.signupInputHandler} className=
                                            {styles.textField} name="todo" />
                                        <TextField required label="Description" placeholder="Description" id="signupinput" defaultValue="" onChange={this.signupInputHandler} className=
                                            {styles.textField} name="description" />
                                        <TextField required label="Add Todos" placeholder="Remainder Date" id="remainderDate" defaultValue="" className={styles.textField} name="date" />
                                        <TextField required label="Add Todos" placeholder="Remainder Time" id="remainderTime" defaultValue="" className={styles.textField} name="time" />
                                        <TextField required label="Description" placeholder="Description" id="signupinput" defaultValue="" onChange={this.signupInputHandler} className=
                                            {styles.textField} name="description" />
                                        <br />
                                        <Button variant="contained" color="primary" onClick={this.handleSubmit} style={styles.button} >Add Todos</Button>
                                    </div> */}
                                    <div className="wrapper">  
                                    <div className="content-i">
                                        <div className="element-box">
                                            <div className="row">
                                            <div className="col-sm-12">
                                                <div className="element-wrapper">
                                                <div id="todo-list" className="row">
                                                    <div id="clockers">
                                                        <div id="clock">
                                                        <div className="point"></div>
                                                        <div className="point"></div>
                                                        <div className="point"></div>
                                                        <div className="point"></div>
                                                        <div className="hours"></div>
                                                        <div className="minutes"></div>
                                                        <div className="seconds"></div>
                                                        <div className="center"></div>
                                                        </div>
                                                    </div>
                                                    <div id="txt" ></div>
                                                    <div className="col-sm-12" id="addToDo"><br/><br/><br/><br/>
                                                <h4 className="element-header">
                                                    Your Todos
                                                </h4>
                                                <br/>

                                                    <span className="todo-wrap">
                                                    <input type="checkbox" id="1"/>
                                                    <label htmlFor="1" className="todo">
                                                        <i className="fa fa-check"></i>
                                                        Have a good idea
                                                    </label>
                                                    <div className="timeLine">
                                                        17-Sep-18 11:47
                                                    </div>
                                                    <span className="delete-item" title="remove">
                                                        <i className="fa fa-times-circle"></i>
                                                    </span>
                                                    </span> 

                                                    <span className="todo-wrap">
                                                    <input type="checkbox" id="2"/>
                                                    <label htmlFor="2" className="todo">
                                                        <i className="fa fa-check"></i>
                                                        Plan idea execution
                                                    </label>
                                                    <div className="timeLine">
                                                        17-Sep-18 11:47
                                                    </div>
                                                    <span className="delete-item" title="remove">
                                                        <i className="fa fa-times-circle"></i>
                                                    </span>
                                                    </span>
                                                    <span className="todo-wrap">
                                                    <input type="checkbox" id="3"/>
                                                    <label htmlFor="3" className="todo">
                                                        <i className="fa fa-check"></i>
                                                        Execute idea
                                                    </label>
                                                    <div className="timeLine">
                                                        17-Sep-18 11:47
                                                    </div>
                                                    <span className="delete-item" title="remove">
                                                        <i className="fa fa-times-circle"></i>
                                                    </span>
                                                    </span>
                                                    <span className="todo-wrap">
                                                    <input type="checkbox" id="4"/>
                                                    <label htmlFor="4" className="todo">
                                                        <i className="fa fa-check"></i>
                                                        Celebrate with a cold one
                                                    </label>
                                                    <div className="timeLine">
                                                        17-Sep-18 11:47
                                                    </div>
                                                    <span className="delete-item" title="remove">
                                                        <i className="fa fa-times-circle"></i>
                                                    </span>
                                                    </span>
                                                    <span className="todo-wrap">
                                                    <label htmlFor="" className="todo">
                                                        <input id="text-todo" type="text" className="input-todo" placeholder="Write.. Todo"/>
                                                        <input id="date-todo" type="text" className="input-todo single-daterange"  value="" />
                                                        <input id="time-todo" type="text" className="input-todo clockpicker" placeholder="Time"/>
                                                    </label>
                                                    </span>
                                                    </div>
                                                    <div id="add-todo">
                                                    <i className="fa fa-plus"></i>
                                                    Add Item
                                                    </div> &nbsp; &nbsp;
                                                    <div id="action-todo">
                                                    <i className="ti-microphone"></i>
                                                    Listen Todo
                                                    </div>
                                                    <div className="col-sm-12 text-right">
                                                    <div className="btn btn-danger" onClick={this.logout}>
                                                        <i className="os-icon os-icon-signs-11"></i>
                                                        Logout
                                                    </div>
                                                    </div>
                                                </div>
                                                </div>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                    ) : (
                            history.replace('/')
                        )}
                </div>
            </DocumentTitle>
        )
    }
}

function mapStateToProp(state) {
    return {
        login_signup_reducer: state.login_signup_reducer,
        session: state.session
    }
}
//Map Dispatch to Props
function mapDispatchToProps(dispatch) {
    return {
        logout:()=>{
            dispatch(login_signup_action.logout())
            }
    }
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProp, mapDispatchToProps)(withStyles(styles)(Dashboard));