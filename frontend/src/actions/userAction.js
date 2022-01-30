import {
    LOGIN_REQUESTS,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    CLEAR_ERRORS,
    REGISTER_USER_REQUESTS,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
} from '../constants/userConstant';
import axios from 'axios';

export const login = ( email, password ) => async ( dispatch ) => {
    try {
        dispatch( {
            type: LOGIN_REQUESTS,
        } );

        const config = { headers: { 'Content-Type': 'application/json' } };
        const { data } = await axios.post(
            'http://localhost:4000/api/v1/login',
            { email, password },
            config
        );
        dispatch( {
            type: LOGIN_SUCCESS,
            payload: data.user,
        } );
    } catch ( error ) {
        dispatch( {
            type: LOGIN_FAIL,
            payload: error.response.data.message,
        } );
    }
}

export const register = ( userData ) => ( dispatch ) => {
    try {
        dispatch( {
            type: REGISTER_USER_REQUESTS,
        } );

        const config = { headers: { 'Content-Type': 'multipart/form-data' } };
        const { data } = axios.post(
            'http://localhost:4000/api/v1/register',
            userData,
            config
        );
        dispatch( {
            type: REGISTER_USER_SUCCESS,
            payload: data.user,
        } );
    } catch ( error ) {
        dispatch( {
            type: REGISTER_USER_FAIL,
            payload: error.response.data.message,
        } );
    }
}


// Clearing errors

export const clearErrors = () => async ( dispatch ) => {
    dispatch( {
        type: CLEAR_ERRORS,
    } );
}