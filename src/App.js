import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import StreamList from './pages/StreamList';
import Movies from './pages/Movies';
import Cart from './pages/Cart';
import About from './pages/About';

import './App.css'; // Make sure you import your CSS here

function App() {
  return (
    <>
      <Navbar />

      {/* ✅ Add the logo image here */}
      <div className="logo-container">
        <img src="/logo-eztech-transparent.png" alt="EZTech Logo" className="logo-badge" />
      </div>

      <Routes>
        <Route path="/" element={<StreamList />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default App;
