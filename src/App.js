// src/App.js
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

// Components
import Layout from './components/Layout';

// Pages
import LoginPage from './pages/Login';
import StreamList from './pages/StreamList';
import Movies from './pages/Movies';
import Cart from './pages/Cart';
import About from './pages/About';
import Search from './pages/Search';
import Watchlist from './pages/Watchlist';
import Subscriptions from './pages/Subscriptions';
import Checkout from './pages/Checkout';
import NotFound from './pages/NotFound';

function App() {
  const [token, setToken] = useState(localStorage.getItem('access_token'));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const isAuthenticated = !!token;

  useEffect(() => {
    if (token) localStorage.setItem('access_token', token);
    if (user) localStorage.setItem('user', JSON.stringify(user));
  }, [token, user]);

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <Routes>
        {/* Public Login Page (no layout) */}
        <Route path="/login" element={<LoginPage setToken={setToken} setUser={setUser} />} />

        {/* Protected Routes */}
        {isAuthenticated ? (
          <>
            <Route path="/" element={<Layout><StreamList /></Layout>} />
            <Route path="/movies" element={<Layout><Movies /></Layout>} />
            <Route path="/search" element={<Layout><Search /></Layout>} />
            <Route path="/subscriptions" element={<Layout><Subscriptions /></Layout>} />
            <Route path="/cart" element={<Layout><Cart /></Layout>} />
            <Route path="/about" element={<Layout><About /></Layout>} />
            <Route path="/watchlist" element={<Layout><Watchlist /></Layout>} />
            <Route path="/checkout" element={<Layout><Checkout /></Layout>} />
            <Route path="*" element={<Layout><NotFound /></Layout>} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
      </Routes>
    </GoogleOAuthProvider>
  );
}

export default App;
