import { combineReducers } from 'redux';
import authReducer from './authReducer';
import fireReducer from './fireReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    fire: fireReducer
})

export default rootReducer;