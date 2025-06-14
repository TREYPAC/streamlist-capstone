import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { WatchlistProvider } from './context/WatchlistContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <WatchlistProvider>
          <App />
        </WatchlistProvider>
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(registration => {
      console.log('ServiceWorker registered:', registration);
    }).catch(error => {
      console.log('ServiceWorker registration failed:', error);
    });
  });
}
