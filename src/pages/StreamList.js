import React, { useState } from 'react';
import '../styles/StreamList.css';

function StreamList() {
  const [movies, setMovies] = useState([]);
  const [newMovie, setNewMovie] = useState('');

  const addMovie = () => {
    if (newMovie.trim() !== '') {
      setMovies([...movies, newMovie]);
      setNewMovie('');
    }
  };

  return (
    <div
      className="streamlist-hero"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL + '/home-hero.png'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
      }}
    >
      <div className="streamlist-content page-overlay fade-in">
        <h1>StreamList</h1>
        <input
          type="text"
          placeholder="Add a movie..."
          value={newMovie}
          onChange={(e) => setNewMovie(e.target.value)}
        />
        <button onClick={addMovie}>Add</button>
        <ul>
          {movies.map((movie, index) => (
            <li key={index}>{movie}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default StreamList;
