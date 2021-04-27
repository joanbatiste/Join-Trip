import {LOGIN, LOGOUT,UPDATE_USER} from '../types/userTypes';

const initialState = {
    user: {},
    
};

const userReducer = (state = initialState, action) => {
    switch(action.type){
        case LOGIN :
            return {
                ...state,
                user : action.payload
            }

        case LOGOUT :
            return {
                ...state,
                user: initialState
            }

        case UPDATE_USER :
            return {
                ...state,
                user : action.payload
            }
        default : 
            return state
    }
};

export default userReducer;