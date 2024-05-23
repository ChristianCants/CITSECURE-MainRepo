import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const container = document.getElementById('root');

let root;

if (!container._root) {
  root = ReactDOM.createRoot(container);
  container._root = root;
} else {
  root = container._root;
}

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
