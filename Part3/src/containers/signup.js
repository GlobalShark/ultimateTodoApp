import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AuthActions } from "../store/actions/index";
import  SignupComponent  from './../components/signup';


class SignUp extends Component {

    constructor(props){
        super(props);
        this.state = {
            userName:"",
            email:"",
            password:"",
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps, "nextProps");
    }

    onChangeHandler(e){
        this.setState({[e.target.name]:e.target.value});
    }

    signupSubmitHandler = (ev) => {
        ev.preventDefault();
        let user = {
            userName:this.state.userName,
            email:this.state.email,
            password:this.state.password
        }
        this.props.signup(user);
        this.setState({
            userName:"",
            email:"",
            password:""
        })
    }

    render() {
        // console.log(this.props.userObj)
        return (
            <SignupComponent submit={this.signupSubmitHandler}  change={this.onChangeHandler.bind(this)} signupState={this.state}/>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state, "redux state")
    return { 
        // authObj: state.AuthReducer,
        // userObj: state.fire
     };
};
const mapDispatchToProps = (dispatch) => {
    return {
        signup: (userObj) => dispatch(AuthActions.signupAction(userObj))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);