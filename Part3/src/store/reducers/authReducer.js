import ActionTypes from '../constant/index.js';

const initialState = {
        user: {},
        isLoading: false,
        isError: false,
        error: {},
        isLoggedIn: false,
    }

export default function authReducer (state = initialState, action)  {
    switch (action.type) {

        case ActionTypes.SIGNUP_SUCCESS: {
            return ({
                ...state,
                isError: false,
                user : action.payload
            })
        } 
        case ActionTypes.SIGNUP_FAILURE: {
            return ({
                ...state,
                isError: true,
                error : action.payload
            })
        } 
        case ActionTypes.SIGNIN_SUCCESS: {
            return ({
                ...state,
                isError: false,
                isLoggedIn: true,
                user : action.payload
            })
        } 
        case ActionTypes.SIGNIN_FAILURE: {
            return ({
                ...state,
                isError: true,
                error : action.payload
            })
        } 
        
        case ActionTypes.ERROR: {
            return ({
                ...state,
                isError : true,
                error : action.payload
            })
        }
        default:
            return state
    }

}