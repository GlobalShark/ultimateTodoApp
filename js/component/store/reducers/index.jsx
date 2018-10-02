import login_signup_reducer from './login_signup_reducer';
import {combineReducers} from 'redux';
import { sessionReducer } from 'redux-react-session';
import FetchTodos from './todo';

var root = combineReducers({
    login_signup_reducer,
    session: sessionReducer,
    FetchTodos
})
export default root;
