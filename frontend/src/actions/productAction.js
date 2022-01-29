import axios from 'axios';
import {
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_REQUESTS,
    PRODUCT_DETAILS_REQUESTS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_SUCCESS,
    CLEAR_ERRORS
} from '../constants/productConstant';

export const getProduct = (keyword="", currentPage = 1, price=[0,25000], category, ratings = 0) => async ( dispatch ) => {
    try {

        dispatch( {
            type: ALL_PRODUCT_REQUESTS
        } );

        let link = `http://localhost:4000/api/v1/products?keyword=${ keyword }&page=${ currentPage }&price[gte]=${ price[0] }&price[lte]=${ price[1] }&ratings[gte]=${ratings}`; 
        
         if (category) {
        link = `http://localhost:4000/api/v1/products?keyword=${ keyword }&page=${ currentPage }&price[gte]=${ price[0] }&price[lte]=${ price[1] }&category=${category}&ratings[gte]=${ratings}`;
        }
        
        const { data } = await axios.get(link);
        dispatch( {
            type: ALL_PRODUCT_SUCCESS,
            payload: data,
        } );
        
    } catch ( error ) {
        dispatch( {
            type: ALL_PRODUCT_FAIL,
            payload: error.response.data.message,
        } );
    }
};


export const getProductDetails = (id) => async ( dispatch ) => {
    try {

        dispatch( {
            type: PRODUCT_DETAILS_REQUESTS
        } );

        const { data } = await axios.get(  `http://localhost:4000/api/v1/product/${id}` );
        dispatch( {
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data.product,
        } );
        
    } catch ( error ) {
        dispatch( {
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message,
        } );
    }
};

// clearing Errors...
export const clearErrors = () => async ( dispatch ) => { 

    dispatch( {
        type: CLEAR_ERRORS,
    } );
}