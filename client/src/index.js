//importing react/react-dom
import React from 'react';
import ReactDOM from 'react-dom';

//importing components
import App from './components/App';


//this is from where my app renders in the browser!
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

