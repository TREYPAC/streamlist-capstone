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
