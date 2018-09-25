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
                                    <p variant="display1" gutterBottom style={{ marginLeft: 50, marginTop: 10 }}>Joined Date {this.props.session.user.joiningdate}</p>
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
        }
    }
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProp, mapDispatchToProps)(withStyles(styles)(Dashboard));