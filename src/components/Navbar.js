// src/components/Navbar.js
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import '../styles/Navbar.css';

function Navbar() {
  const { cart } = useContext(CartContext);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0); // total quantity

  return (
    <nav className="navbar">
      <NavLink to="/" className="nav-link">Home</NavLink>
      <NavLink to="/movies" className="nav-link">Movies</NavLink>
      <NavLink to="/search" className="nav-link">Search</NavLink>
      <NavLink to="/subscriptions" className="nav-link">Subscriptions</NavLink>
      <NavLink to="/cart" className="nav-link">
        Cart
        {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
      </NavLink>
      <NavLink to="/about" className="nav-link">About</NavLink>
      <NavLink to="/watchlist" className="nav-link">Watchlist</NavLink>
    </nav>
  );
}

export default Navbar;
