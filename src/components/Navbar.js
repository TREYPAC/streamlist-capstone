import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <NavLink exact="true" to="/" className="nav-link" activeClassName="active">
        Home
      </NavLink>
      <NavLink to="/movies" className="nav-link" activeClassName="active">
        Movies
      </NavLink>
      <NavLink to="/search" className="nav-link" activeClassName="active">
        Search
      </NavLink>
      <NavLink to="/subscriptions" className="nav-link" activeClassName="active">
        Subscriptions
      </NavLink>
      <NavLink to="/cart" className="nav-link" activeClassName="active">
        Cart
      </NavLink>
      <NavLink to="/about" className="nav-link" activeClassName="active">
        About
      </NavLink>
      <NavLink to="/watchlist" className="nav-link" activeClassName="active">
        Watchlist
      </NavLink>
    </nav>
  );
}

export default Navbar;
