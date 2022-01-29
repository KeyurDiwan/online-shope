import React, { Fragment } from 'react';
import './Search.css';  
import { useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData';

const Search = () => {

    const [keyword, setKeyword] = React.useState( '' );
    
    let navigate = useNavigate();

     
    
    const searchSubmitHandler = ( e ) => {
        e.preventDefault();

        if ( keyword.trim() ) {
            navigate( `/products/${ keyword }` );
        } else {

            navigate( '/products' );
        }
    }

    return <Fragment>

        <MetaData title="--Search Page--" />
        
        <form className="searchBox" onSubmit={searchSubmitHandler}>
            <input
                type="text"
                placeholder="Search"
                onChange = {(e) => setKeyword(e.target.value)}
            />
            <input type="submit" value="Search" />
        </form>
  </Fragment>;
};

export default Search;
