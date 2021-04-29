import { SAVING } from '../types/tripTypes';

const initialState = {
    trip: {},

};

const tripReducer = (state = initialState, action) => {
    switch (action.type) {
        case SAVING:
            return {
                ...state,
                trip: action.payload
            }
        default : 
        return state
    }
};

export default tripReducer;