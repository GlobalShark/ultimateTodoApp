import {createStore,applyMiddleware,combineReducers,compose} from 'redux';
import root from './reducers/index'
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { sessionService } from 'redux-react-session';

const middleware = applyMiddleware(thunk,logger);
const store = createStore(
    root,
    {},    
    compose(middleware)
)
const options = { refreshOnCheckAuth: true, redirectPath: '/signup', driver: 'COOKIES' };
sessionService.initSessionService(store, options)
  .then(() => console.log('Redux React Session is ready and a session was refreshed from your storage'))
  .catch(() => console.log('Redux React Session is ready and there is no session in your storage'));
export default store;