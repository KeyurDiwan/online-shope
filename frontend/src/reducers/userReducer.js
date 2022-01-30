
import {
    LOGIN_REQUESTS,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_REQUESTS,
    REGISTER_USER_FAIL,
    CLEAR_ERRORS,
} from '../constants/userConstant';

export const userReducer = (  state  = { user: {} }, action ) => {
    switch ( action.type ) { 
        case LOGIN_REQUESTS:
        case REGISTER_USER_REQUESTS:
            
            return {
                loading: true,
                isAuthenticated: false,
            };
        case LOGIN_SUCCESS:
        case REGISTER_USER_SUCCESS:
            
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload,
            };
        case LOGIN_FAIL:
        case REGISTER_USER_FAIL:
            
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        default:
            return state;
    }
}