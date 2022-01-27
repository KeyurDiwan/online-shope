import './App.css';
import React, {useEffect} from 'react';
import Header from './component/layout/Header/Header.js';
import Footer from './component/layout/Footer/Footer.js';
import { BrowserRouter as Router } from 'react-router-dom';
import  webfont  from 'webfontloader';




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
      <Router>
        <Header />
        <Footer />
     </Router>
    
    </div>
  );
}

export default App;
