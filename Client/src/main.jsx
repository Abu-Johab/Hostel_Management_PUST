import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

console.log('main.jsx loaded');

let container = document.getElementById('root');
if (!container) {
  // create root if index.html is missing or id was wrong
  container = document.createElement('div');
  container.id = 'root';
  document.body.appendChild(container);
  console.warn('Created missing #root element dynamically.');
}

const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);