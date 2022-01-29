import React, { Fragment, useEffect, useState } from 'react';
import './Products.css';
import { useSelector, useDispatch } from 'react-redux';
import { getProduct, clearErrors } from '../../actions/productAction';
import Loader from '../layout/Loader/Loader';
import ProductCard from '../Home/ProductCard';
import { useParams, useSearchParams } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import { Typography, Slider } from '@material-ui/core';

const Products = () => {

    const dispatch = useDispatch();

    const { id } = useParams();

    const [currentPage, setCurrentPage] = useState( 1 );
    const [price, setPrice] = useState( [0, 25000] );

    const {
        loading,
        error,
        products,
        productsCount,
        resultPerPage,
        // filteredProductsCount
    } = useSelector(
        state => state.products );
    
    const setCurrentPageNo = ( e ) => {
        setCurrentPage( e );
    }

    const priceHandler = ( event, newPrice ) => {
        setPrice( newPrice );
    }

    // let count = filteredProductsCount; 

    useEffect( () => {
        dispatch( getProduct(id, currentPage, price) );
        return () => {
            dispatch( clearErrors() );
        };
        
    }, [dispatch, id, currentPage, price, error] );


    

    return <Fragment>
        {loading ? <Loader /> :
            (
                <Fragment>
            
                <h2 className="productsHeading">  Products </h2>
                
                <div className='products'>
                    {products &&
                        products.map( ( product ) => (
                            <ProductCard key={product._id} product={product} />
                            
                        ) )}
                </div>

                    
                    <div className="filterBox">
                        <Typography>Price</Typography>
                        <Slider
                            value={price}
                            onChange={priceHandler}
                            valueLabelDisplay='auto'
                            aria-labelledby="range-slider"
                            min={0}
                            max={25000}

                        />
                    </div>

                    {resultPerPage < productsCount && (
                         <div className="paginationBox">
                                 <Pagination
                                   activePage={currentPage}
                                   itemsCountPerPage={resultPerPage}
                                   totalItemsCount={productsCount}
                                   onChange={setCurrentPageNo}
                                   nextPageText="Next"
                                   prevPageText="Prev"
                                   firstPageText="1st"
                                   lastPageText="Last"
                                   itemClass="page-item"
                                   linkClass="page-link"
                                   activeClass="pageItemActive"
                                   activeLinkClass="pageLinkActive"
                                 />
                        </div>
                   )}
            
                </Fragment>
            )
        }

    </Fragment>;
};

export default Products;
