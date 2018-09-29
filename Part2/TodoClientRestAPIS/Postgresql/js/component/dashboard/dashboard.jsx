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
import TodoMiddleware from '../store/middleware/todo';



const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        paddingLeft: 50,
    },
    textField: {
        marginLeft: `${theme.spacing.unit}px 0`,
        width: '600',
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

class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            todo: '',
            todosList: undefined,
            description: '',
            updateTodo:false,
            updateTodoVal:'',
            updatedTodoValue:'',
        }
        this.classes = { props }
        this._onChangeHandler = this._onChangeHandler.bind(this);
        this._submitTodo = this._submitTodo.bind(this);
        this.closeSnackbar = this.closeSnackbar.bind(this);
        this.onChangeUpdateInput = this.onChangeUpdateInput.bind(this);
        this.onSubmitUpdatedValue = this.onSubmitUpdatedValue.bind(this);
        this.logout = this.logout.bind(this).bind(this);
    }

     // Onchange Todo
    _onChangeHandler(event){
        this.setState({
            todo: event.target.value
        })
    }

    // Todo Submit
    _submitTodo(){
        var typedTodo = this.state.todo;
        const addTodo = {
            typedTodo,
            uid:this.props.session.user.uid
        }; 
             this.props.addtodo(addTodo)
             this.props.fetchTodo()
    }

    // Action before render
    componentWillMount() {
        this.props.fetchTodo()
    }

    // Recieve Props 
    componentWillReceiveProps(){
        const data = this.props.FetchTodos.todoData.payload //Data 
        // console.log("Recive props datas",data)
        this.setState({
            todosList:data
        })
    }

    // Props Update 
    componentWillUpdate(){
        this.props.fetchTodo()
    }

    // close snackbar
    closeSnackbar() {
        this.setState({
            snackbaropen: false
        })
    }

    // Delete Todo
    deleteTodo(val) {
    let deleteTodo = {
        val,
        uid:this.props.session.user.uid
    }
    this.props.deleteTodo(deleteTodo)
    }

    // Boolean True on Button Press of Update
    updateTodo(val){
        this.setState({
            updateTodo:true,
            updateTodoVal:val
        })
    }

    // On change Update Input
    onChangeUpdateInput(event){
        this.setState({
            updatedTodoValue:event.target.value
        })
    }

    // Submit Updated Value
    onSubmitUpdatedValue(){
        var updateTodo = this.state.updatedTodoValue;
        var previousTodo = this.state.updateTodoVal
        const addTodo = {
            previousTodo,
            updateTodo,
            uid:this.props.session.user.uid
        };
        this.props.updateTodo(addTodo)
        this.setState({
            updateTodo:false,
            updatedTodoValue:'',
        })
    }

    // Logout
    logout() {
        var logout = {
            uid: this.props.session.user.uid
        }
        axios.post(`http://localhost:5050/logoutUser`, { logout }).then(res => {
            // console.log("then", res);
            this.props.logout()
            sessionService.deleteSession();
            sessionService.deleteUser();
            history.replace('/');
        })
    }
    // Render
    render() {
        const { classes } = this.props;
        const {todosList , updateTodo, updateTodoVal} = this.state;
        return (
            <DocumentTitle title="Dashboard">
                <div className="signupContainer">
                    {(this.props.session.authenticated) ? (
                        <div>
                            {(this.props.session.user.length === 0) ? (history.replace('/dashboard')) : (
                                <div>
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
                                                                <div className="col-sm-12" id="addToDo"><br /><br /><br /><br />
                                                                    <h4 className="element-header">
                                                                        Todosss
                                                                </h4>                                                                                                                                    

                                                                <br />
                                                                {/* Todo List */}
                                                                {/* <span className="todo-wrap">
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
                                                    <br />
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
                                                    </span> */}
                                                    {
                                                        (todosList)?
                                                         <div>
                                                             {
                                                                todosList.map((val,key)=>{
                                                                    return(
                                                                    <div>
                                                                            <span className="todo-wrap" key={key}>
                                                                            <input type="checkbox" id={key}/>
                                                                            <label htmlFor={key} className="todo">
                                                                            <i className="fa fa-check"></i>{val.todo}</label>
                                                                            <div className="timeLine">{new Date().toUTCString()}</div>
                                                                            <button onClick={this.updateTodo.bind(this,val.todo)}>Update</button>
                                                                            <span className="delete-item" title="remove" onClick={this.deleteTodo.bind(this,val.todo)}>
                                                                            <i className="fa fa-times-circle"></i>
                                                                            </span>
                                                                            </span>
                                                                            <br /> 
                                                                    </div>
                                                                    )
                                                                })
                                                             }
                                                         </div>
                                                        :
                                                        <div>
                                                            {
                                                                // console.log("Task not found")
                                                            }
                                                        </div>
                                                    }
                                                    </div>
                                                                <div className="row" id="action-todo">
                                                                    <div className="col-sm-12">
                                                                    <i className="ti-microphone"></i>
                                                                    Listen Todo
                                                                    </div>
                                                                    <br /><br />
                                                                </div>
                                                                {
                                                                    (updateTodo)?
                                                                    <div>
                                                                        <div className="row">
                                                                            <div className="col-sm-8">
                                                                                <TextField id="standard-with-placeholder" label="Update your Todo" placeholder={updateTodoVal} className={classes.textField} margin="normal" onChange={this.onChangeUpdateInput}/> 
                                                                            </div>
                                                                        </div>
                                                                        <Button variant="contained" color="primary" className={classes.button} onClick={this.onSubmitUpdatedValue}>Update {updateTodoVal}</Button>
                                                                    </div>
                                                                    :
                                                                    <div>
                                                                        <div className="row">
                                                                            <div className="col-sm-8">
                                                                                <TextField id="standard-with-placeholder" label="Write Todo Here" placeholder="Going To Gym" className={classes.textField} margin="normal" onChange={this._onChangeHandler}/> 
                                                                            </div>
                                                                        </div>    
                                                                        <Button variant="contained" color="primary" className={classes.button} onClick={this._submitTodo}>Add</Button>
                                                                    </div>
                                                                }
                                                                {/* <div className="row">
                                                                        <div className="col-sm-8">
                                                                            <TextField id="standard-with-placeholder" label="Write Todo Here" placeholder="Going To Gym" className={classes.textField} margin="normal" onChange={this._onChangeHandler}/> 
                                                                        </div>
                                                                </div>
                                                                <Button variant="contained" color="primary" className={classes.button} onClick={this._submitTodo}>Add</Button> */}
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
        session: state.session,
        FetchTodos:state.FetchTodos
    }
}
//Map Dispatch to Props
function mapDispatchToProps(dispatch) {
    return {
        logout: () => {
            dispatch(login_signup_action.logout())
        },
        addtodo:(data)=>{
           dispatch(TodoMiddleware.asynctodo(data))
        },
        fetchTodo:()=>{
            dispatch(TodoMiddleware.asyncFetchTodo())
        },
        deleteTodo:(data)=>{
          dispatch(TodoMiddleware.deleteTodo(data))
        },
        updateTodo:(data)=>{
            dispatch(TodoMiddleware.updateTodo(data))
        }
    }
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProp, mapDispatchToProps)(withStyles(styles)(Dashboard));