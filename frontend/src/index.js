import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import { positions, transitions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';


const options = {
  timeout: 5000,
  positions: positions.BOTTOM_CENTER,
  transition: transitions.SCALE,
}


ReactDOM.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
   <BrowserRouter>
        <App />
      </BrowserRouter>
      </AlertProvider>
  </Provider>,
  document.getElementById('root')
);


