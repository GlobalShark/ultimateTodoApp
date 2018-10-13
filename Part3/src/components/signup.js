import React, { Component } from 'react';

class SignupComponent extends Component {
    render() {
        return (
            <div style={{"width" : "60%", "marginLeft" : "38%", "marginTop" : "60px"}}> 
                <img src='icon.png' style={{"height" : "120px", "marginLeft":"12%"}} />
                <form onSubmit={this.props.submit.bind(this)} className="form-group">
                Username:
                <input type="text" name="userName" className="form-control col-md-5" placeholder="username" value={this.props.signupState.userName}  onChange={this.props.change.bind(this)} required /><br/>
                Email:
                <input type="email" name="email" className="form-control col-md-5" placeholder="email" value={this.props.signupState.email}  onChange={this.props.change.bind(this)} required /><br />
                Password:
                <input type="password" name="password" className="form-control col-md-5" placeholder="password" value={this.props.signupState.password}  onChange={this.props.change.bind(this)} required /> <br />

                <button className="btn btn-primary">SignUp</button>
                </form>
            </div>
        );
    }
}

export default SignupComponent;