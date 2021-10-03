import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { GoogleProvider } from './context/context';

ReactDOM.render(
  <React.StrictMode>
    <GoogleProvider>
      <App />
    </GoogleProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

