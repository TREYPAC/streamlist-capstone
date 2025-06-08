import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

import Navbar from './components/Navbar';
import Layout from './components/Layout';
import ProtectedRoute from './utils/ProtectedRoute';

import { CartProvider } from './context/CartContext';
import { WatchlistProvider } from './context/WatchlistContext';

import StreamList from './pages/StreamList';
import Movies from './pages/Movies';
import Cart from './pages/Cart';
import About from './pages/About';
import Search from './pages/Search';
import Watchlist from './pages/Watchlist';
import Subscriptions from './pages/Subscriptions';
import Checkout from './pages/Checkout';
import LoginPage from './pages/Login';
import NotFound from './pages/NotFound';

import './App.css';

function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('access_token');
    const savedUser = localStorage.getItem('user');

    if (savedToken) setToken(savedToken);
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (err) {
        console.error("Invalid user in localStorage", err);
      }
    }
  }, []);

  const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const isAuthenticated = !!token;

  if (!googleClientId) {
    return <div>Error: Google Client ID is not configured.</div>;
  }

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <CartProvider>
        <WatchlistProvider>
          {isAuthenticated && (
            <>
              <Navbar />
              <div className="logo-container">
                <img src="/logo-eztech-transparent.png" alt="EZTech Logo" className="logo-badge" />
              </div>
            </>
          )}

          <Routes>
            <Route path="/login" element={<LoginPage setToken={setToken} setUser={setUser} />} />
            {isAuthenticated && <Route path="/login" element={<Navigate to="/" replace />} />}

            <Route
              path="/"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Layout><StreamList /></Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/movies"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Layout><Movies /></Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Layout><Cart /></Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/about"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Layout><About /></Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/search"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Layout><Search /></Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/watchlist"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Layout><Watchlist /></Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/subscriptions"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Layout><Subscriptions /></Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Layout><Checkout /></Layout>
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </WatchlistProvider>
      </CartProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
