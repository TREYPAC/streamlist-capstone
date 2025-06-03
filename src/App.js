import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import StreamList from './pages/StreamList';
import Movies from './pages/Movies';
import Cart from './pages/Cart';
import About from './pages/About';
import Search from './pages/Search';
import Watchlist from './pages/Watchlist'; // ✅ Import only — no Route here

import './App.css';

function App() {
  return (
    <>
      <Navbar />

      <div className="logo-container">
        <img src="/logo-eztech-transparent.png" alt="EZTech Logo" className="logo-badge" />
      </div>

      <Routes>
        <Route path="/" element={<StreamList />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
        <Route path="/search" element={<Search />} />
        <Route path="/watchlist" element={<Watchlist />} /> {/* ✅ Correct placement */}
      </Routes>
    </>
  );
}

export default App;
