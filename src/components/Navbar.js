import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <NavLink exact="true" to="/" className="nav-link" activeclassname="active">
        Home
      </NavLink>
      <NavLink to="/movies" className="nav-link" activeclassname="active">
        Movies
      </NavLink>
      <NavLink to="/cart" className="nav-link" activeclassname="active">
        Cart
      </NavLink>
      <NavLink to="/about" className="nav-link" activeclassname="active">
        About
      </NavLink>
    </nav>
  );
}

export default Navbar;
