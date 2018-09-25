import login_signup_action from '../actions/login_signup_action';
const INITIAL_STATE={
    userAuth:{},
    userRegistered:false,
    authenticated:false,
    loading:false,
    error:false,
    errorMessage:{}
}  
const login_signup_reducer=(state=INITIAL_STATE,action)=>{
    var REGISTER  ='REGISTER'
    var REGISTER_SUCCESS = 'REGISTER_SUCCESS'
    var REGISTER_FAILED = 'REGISTER_FAILED'
    var LOGIN =  'LOGIN'
    var LOGIN_SUCCESS = 'LOGIN_SUCCESS'
    var LOGIN_FAILED = 'LOGIN_FAILED'
    var LOGOUT = 'LOGOUT'
     switch (action.type) {
         case REGISTER:
             return{
                  loading:true, error:false,userRegistered:false
             }
            case REGISTER_SUCCESS:
            return{
                loading:false, error:false,userRegistered:true
            }
            case REGISTER_FAILED:
            return{
                loading:false,error:true,errorMessage:action.payload
            }
            case LOGIN:
            return{
                loading:true,error:false,authenticated:false
            }
            case LOGIN_SUCCESS:
            return{
                loading:false, error:false, authenticated:true, userAuth:action.payload , userRegistered:false, errorMessage:{}
            }
            case LOGIN_FAILED:
            // console.log(action.payload)
            return{
                loading:false, error:true, authenticated:false, errorMessage:action.payload
            }
            case LOGOUT:
            return{
                loading:false, error:false, authenticated:false,userRegistered:false
            }
         default:
             return state;
     }
}
export default login_signup_reducer;