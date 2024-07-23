import React from 'react';
import { createRoot } from 'react-dom/client'; // Import from 'react-dom/client'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const rootElement = document.getElementById('root');

// Replace ReactDOM.render with createRoot
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();