import history from '../../../router/history';
import login_signup_reducer from '../reducers/login_signup_reducer';

export default class login_signup_action{
      //Action Types
    // const REGISTER = 'REGISTER';
    // var REGISTER_SUCCESS = 'REGISTER_SUCCESS';
    // static REGISTER_FAILED = 'REGISTER_FAILED';
    // static LOGIN = 'LOGIN';
    // static LOGIN_SUCCESS = 'LOGIN_SUCCESS'
    // static LOGIN_FAILED = 'LOGIN_FAILED'
    // static LOGOUT = 'LOGOUT'

    // Signup Actions
    static register(){
        return{
            type:'REGISTER'
        }
    }
    static register_success(success){
        return{
            type:'REGISTER_SUCCESS',
            payload:success
        }
    }
    static register_failed(error){
        return{
            type:'REGISTER_FAILED',
            payload:error ///hunnain sending i am sending only err
        }
    }

    // Login Actions
    static login(){
        return{
            type:'LOGIN'
        }
    }
    static login_Success(data){
        return{
            type:'LOGIN_SUCCESS',
            payload:data
        }
    }
    static login_Failed(error){
        return{
            type:'LOGIN_FAILED',
            payload:error.message
        }
    }
    static logout(){
        return{
            type:'LOGOUT'
        }
    }

   
}