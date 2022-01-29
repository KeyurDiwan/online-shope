import React, { Fragment, useEffect, useState } from 'react';
import './Products.css';
import { useSelector, useDispatch } from 'react-redux';
import { getProduct, clearErrors } from '../../actions/productAction';
import Loader from '../layout/Loader/Loader';
import ProductCard from '../Home/ProductCard';
import { useParams } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import { Typography, Slider } from '@material-ui/core';
import { useAlert } from 'react-alert';
import MetaData from '../layout/MetaData';


const categories = [
    "laptop",
    "Footware",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "Smartphone",
]

const Products = () => {

    const dispatch = useDispatch();

    const alert = useAlert();

    const { id } = useParams();

    const [currentPage, setCurrentPage] = useState( 1 );
    const [price, setPrice] = useState( [0, 25000] );
    const [category, setCategory] = useState( "" );
    const [ratings, setRatings] = useState( 0);

    const {
        loading,
        error,
        products,
        productsCount,
        resultPerPage,
        filteredProductsCount
    } = useSelector(
        state => state.products );
    
    const setCurrentPageNo = ( e ) => {
        setCurrentPage( e );
    }

    const priceHandler = ( event, newPrice ) => {
        setPrice( newPrice );
    }

    let count = filteredProductsCount; 

    useEffect( () => {
        if ( error ) {
            alert.error( error );
            dispatch( clearErrors() );
        }
        dispatch( getProduct(id, currentPage, price,category,ratings) );
        return () => {
            dispatch( clearErrors() );
        };
        
    }, [dispatch, id, currentPage, price, error,category,ratings, alert] );


    

    return <Fragment>
        {loading ? <Loader /> :
            (
                <Fragment>

                    <MetaData title = "--Products Page--"/>
            
                <h2 className="productsHeading">  Products </h2>
                
                <div className='products'>
                    {products &&
                        products.map( ( product ) => (
                            <ProductCard key={product._id} product={product} />
                            
                        ) )}
                </div>

                    
                    {id && (
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

                        <Typography> Categories   </Typography>

                        <ul className="categoryBox">
                            {categories.map( ( category ) => (                                <li
                                    className="category-link"
                                    key={category}
                                    onClick={() => setCategory( category )}
                                >
                                    {category}
                                </li>
                            ))}
                        </ul>

                        <fieldset>
                            <Typography component="legend" >
                                    Rating Above
                            </Typography>

                            <Slider
                                value={ratings}
                                onChange={( e, newRating ) => {
                                    setRatings( newRating );

                                }}
                                aria-labelledby="continuous-slider"
                                min={0}
                                max={5}
                                valueLabelDisplay="auto"
                            />

                        </fieldset>

                    </div>
                  )}

                    {resultPerPage < count && (
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
