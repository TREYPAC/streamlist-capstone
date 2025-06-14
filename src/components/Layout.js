import React from 'react';
import Navbar from './Navbar'; // Assuming Navbar is in src/components

function Layout({ children }) {
  return (
    <>
      {/* Shared Navbar */}
      <Navbar />

      {/* Optional Logo */}
      <div className="logo-container">
        <img
          src="/logo-eztech-transparent.png"
          alt="EZTech Logo"
          className="logo-badge"
        />
      </div>

      {/* Page Content */}
      <main className="content">
        {children}
      </main>

      {/* Optional Footer */}
      {/* <Footer /> */}
    </>
  );
}

export default Layout;
