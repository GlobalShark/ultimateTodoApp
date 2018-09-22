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
import * as firebase from 'firebase';
import {db} from '../../index';
import TodoList from '../todoList/todolist';



const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        paddingLeft: 50,
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
            todoID:'',
            userUID: '',
            todo: '',
            todoData: '',
            description: '',
            todoArray: [],
        }
        this.classes = { props }
        this.signupInputHandler = this.signupInputHandler.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.closeSnackbar = this.closeSnackbar.bind(this)
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
        let random= Math.random();
        let todoID = random;
        var userData = {
            todo: this.state.todo,
            description: this.state.description,
            todoID: todoID,
            // uid: this.props.session.user.uid //no need
        }
        console.log('FINAL SUBMISSION DATA')
        console.log(userData)

        //generating random ids for todos
       
        this.setState({todoID: todoID})

        let previousdata = this.state.todoData;
        let previoustodos = previousdata.todos;
        console.log(previoustodos)
       
        previoustodos[todoID] = userData
        // Object.assign(previoustodos, {[todoID]:userData})
        console.log(previoustodos)
        let todos = previoustodos;
        previousdata.todos = todos
        // Object.assign(previousdata, todos)
        console.log(previousdata)
        //updating user todo

        db.collection("users").doc(this.state.userUID).set(previousdata)
        .then(function(docRef) {
            console.log("Document written with ID: ");
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
        

        // axios.post(`http://localhost:5050/addtodos`, { user })

        //     .then(res => {
        //         console.log("then", res);
        //         if (res.data === 'success') {
        //             console.log('perfect')

        //         }

        //         responsedata = res.data
        //         this.state.registerSuccess = responsedata

        //     }).catch((error) => {
        //         this.props.signupFailed(error)
        //         console.log('Error checking', error)
        //     })
    }

    componentDidMount() {
        // var userData = undefined
        // axios.get('/fetchtodoapi/v1.0')
        //     .then(function (response) {
        //         console.log('myresponse todo', response);
        //         return response
        //         // this.setState({ todoData: response.data })
        //         //   this.state.todoData = response
        //         // .then((responseText) => responseText.json())
        //         // .then((response) => this.setState(response));
        //     }).then((res) => {
        //         console.log('2nd then', res)
        //         this.setState({ todoData: res.data })
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });
        // console.log('after fetchtodoapi', userData)
        // this.setState({ todoData: userData })
        console.log('Session')
        console.log(this.props.session)
        //getting user uid for getting data from firestore
        let userId = localStorage.getItem("ultimatetodo-user-id");
        console.log(userId)
        this.setState({userUID: userId})

        let that = this;
        if(userId === null) {
            sessionService.deleteSession();
            sessionService.deleteUser();
            // history.replace('/login');  
        }
        else{
            // getting data from firestore
            db.collection("users").doc(userId)
            .onSnapshot(function(doc) {
                console.log('USER DATA')
                console.log("Current data: ", doc.data());
                that.setState({ todoData: doc.data() })
                let todos = doc.data().todos ;
                //putting todos in a array
                var todoarray = [];
                for(var key in todos) {
                    todoarray.push(todos[key]);
                           
                    }
                console.log(todoarray)
                that.setState({todoArray: todoarray})
                
            });
        }


    }
    // Component Update
    // componentWillUpdate(){
    //     axios.get('/fetchtodoapi/v1.')
    //     .then(function (response) {
    //       console.log('myresponse todo',response);
    //       this.state.todoData = response

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
    render() {
        const { classes } = this.props;
        var todoData = this.state.todoData
        // console.log('mymymymTodolist', todoData)
        return (
            <DocumentTitle title="Dashboard">
                <div className="signupContainer">
                    {(this.props.session.authenticated) ? (
                        <div>
                            {(this.props.session.user.length === 0) ? (history.replace('/dashboard')) : (
                                <div>
                                    <p variant="display1" gutterBottom style={{ marginLeft: 50, marginTop: 10 }}>Joined Date: {this.state.todoData.joiningdate}</p>
                                    <Typography variant="display1" gutterBottom style={{ textAlign: 'center', marginTop: 10 }}>Welcome {this.state.todoData.userName}</Typography>
                                    <div id="tododiv">
                                        <TextField required label="Add Todos" placeholder="Add Todos" id="signupinput" defaultValue="" helperText="Example: Going to Jym" onChange={this.signupInputHandler} className=
                                            {styles.textField} name="todo" />
                                        <TextField required label="Description" placeholder="Description" id="signupinput" defaultValue="" onChange={this.signupInputHandler} className=
                                            {styles.textField} name="description" /><Button onClick={this.handleSubmit} color="primary">Add Todos</Button>
                                    </div>

                                    <div className='todo-list'>
                                        {
                                            this.state.todoArray.map((data, index)=>{
                                                //rendering todos
                                               
                                                    var a = data;
                                                    console.log(a);
                                                    console.log(a.todoID);
                                                  return(
                                                     
                                                    <TodoList key={a.todoID} todoID={a.todoID} todo={a.todo} description={a.description} userID={this.state.userUID}  />
                                            )
                                        }
                                    
                                    )
                                    }
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
        signup: (userInfo) => {
            dispatch(login_signup_action.register())
        },
        signupsucces: (userInfo) => {
            dispatch(login_signup_action.register_success())
        },
        signupFailed: (error) => {
            dispatch(login_signup_action.register_failed(error))
        },
     
    }
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProp, mapDispatchToProps)(withStyles(styles)(Dashboard));