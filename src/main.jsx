import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles.css';

if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

const isHomeRoute = window.location.pathname === '/' || window.location.pathname === '/index.html';

if (isHomeRoute && !window.location.hash) {
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
