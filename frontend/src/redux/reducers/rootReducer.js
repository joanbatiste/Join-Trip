import {combineReducers} from 'redux';
import userReducer from './userReducer.js';
import tripReducer from './tripReducer.js';



const rootReducer = combineReducers({
    userReducer,
    tripReducer
 
});

export default rootReducer;