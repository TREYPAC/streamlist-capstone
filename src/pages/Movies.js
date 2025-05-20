import React from 'react';
import '../styles/Movies.css';

function Movies() {
  return (
    <div
      className="movies-page"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL + '/frosted-grid.png'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white'
      }}
    >
      <div className="page-overlay fade-in">
        <h1>Movies Page</h1>
        <p>This page is under construction and will be built in <strong>Week 4</strong>.</p>
      </div>
    </div>
  );
}

export default Movies;
