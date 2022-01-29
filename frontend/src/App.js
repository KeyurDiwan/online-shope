import './App.css';
import React, {useEffect} from 'react';
import Header from './component/layout/Header/Header.js';
import Footer from './component/layout/Footer/Footer.js';
import { Route, Routes, useNavigate } from 'react-router-dom';
import webfont from 'webfontloader';
import Home from './component/Home/Home.js'
import Loader from './component/layout/Loader/Loader';
import ProductDetails from './component/product/ProductDetails.js';
import Products from './component/product/Products.js';
import Search from './component/product/Search.js';
import LoginSignUp from './component/User/LoginSignUp';




function App() {
  useEffect( () => {
  webfont.load( {
    google: {
      families: ['Roboto', 'Droid Sans', 'Chilanka']
    }
  } )
  }, [] );
  

  return (
    <div className="App">
     
        <Header />
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/product/:id" element={<ProductDetails/>}></Route>
        <Route path="/products" element={<Products/>}></Route>
        <Route path="/products/:id" element={<Products/>}></Route>
        <Route path="/search" element={<Search/>}></Route>
        <Route path="/login" element={<LoginSignUp/>}></Route>
      
     

      </Routes>
        <Footer />
   
    
    </div>
  );
}

export default App;
