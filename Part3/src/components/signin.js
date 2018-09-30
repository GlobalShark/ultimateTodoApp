import React, { Component } from 'react';
import history from "../History";


  
  


class SigninComponent extends Component {
    
    render() {
        return (
            <div style={{"width" : "60%", "marginLeft" : "38%", "marginTop" : "60px"}}>
                <h1>Welcome Back</h1>
                <form onSubmit={this.props.submit.bind(this)} >
                Email:
                <input type="email" name="email" className="form-control col-md-12" value={this.props.loginState.email} onChange={this.props.change.bind(this)} required /><br />
                Password:
                <input type="password" name="password" className="form-control col-md-12" title="password must consist on 6 charecters" value={this.props.loginState.password} onChange={this.props.change.bind(this)} required />
                <small style={{"fontSize":"3px;"}}>password must consist at lest 6 charecters</small><br/><br/>
                <button className="btn btn-primary">
                    Login 
                </button><br /> <br />
                <p> Don't have account
                <button onClick={() => { history.push('/signup') }} className="btn btn-primary" style={{"marginLeft" : "90px"}}>
                    Signup
                </button>
                </p>
                </form>
            </div>
        );
    }
}

export default SigninComponent;