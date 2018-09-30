import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AuthActions } from "../store/actions/index";
import  SigninComponent  from './../components/signin';

class Signin extends Component {

    constructor(props){
        super(props);
        this.state = {
            email:"",
            password:""
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
    };

    onchangeValue(e){
        this.setState({[e.target.name]:e.target.value.trim()})
     //   this.setState({[e.target.id]:e.target.value})
    }

    loginSubmitHandler = (ev) => {
        ev.preventDefault()
        if(this.state.password.length >= 6){
            let user = {
                email:this.state.email,
                password:this.state.password
            }
            this.props.login(user);
            this.setState({
            email:"",
            password:""
            })
        }
        else {
            alert("please enter valid email or password");
        }
       
    }

    render() {
        // console.log("login State",this.props.userObj)
        return (
            <SigninComponent submit={this.loginSubmitHandler} loginState={this.state} change={this.onchangeValue.bind(this)}/>
        );
    }
}

const mapStateToProps = (state) => {
    console.log("Sign in State", state);
    return { 
        // authObj: state.AuthReducer,
        // userObj: state.fire
     };
};
const mapDispatchToProps = (dispatch) => {
    return {
        // signin: (userObj) => dispatch(AuthActions.signin(userObj)),
        login: (user) => dispatch(AuthActions.signinAction(user))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signin);