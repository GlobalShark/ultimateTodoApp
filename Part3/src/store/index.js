import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';


// For initialize in application

function configureStore() {
    return createStore(
        rootReducer,
        {},
        applyMiddleware(thunk));
}

export const store = configureStore();

// import rootReducer from './reducer';
// import {createStore, applyMiddleware} from 'redux';
// import thunk from 'redux-thunk';

// const store = createStore(
//     rootReducer,
//     {},
//     applyMiddleware(thunk)
// );

// export default store;