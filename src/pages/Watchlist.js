import React, { useEffect, useState } from 'react';

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('watchlist');
    if (saved) {
      setWatchlist(JSON.parse(saved));
    }
  }, []);

  const toggleWatched = (index) => {
    const updated = [...watchlist];
    updated[index].watched = !updated[index].watched;
    setWatchlist(updated);
    localStorage.setItem('watchlist', JSON.stringify(updated));
  };

  const deleteFromWatchlist = (index) => {
    const updated = watchlist.filter((_, i) => i !== index);
    setWatchlist(updated);
    localStorage.setItem('watchlist', JSON.stringify(updated));
  };

  const getPoster = (movie) => {
    if (movie.image) return movie.image;
    if (movie.poster_path) return `https://image.tmdb.org/t/p/w200${movie.poster_path}`;
    return 'https://via.placeholder.com/200x300?text=No+Image';
  };

  return (
    <div style={{ padding: '40px' }}>
      <h2>Your Watchlist</h2>
      {watchlist.length === 0 ? (
        <p>No movies saved yet.</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1rem' }}>
          {watchlist.map((movie, index) => (
            <div key={movie.id} style={{ width: '200px', textAlign: 'center' }}>
              <img
                src={getPoster(movie)}
                alt={movie.title}
                style={{
                  width: '100%',
                  borderRadius: '6px',
                  height: '300px',
                  objectFit: 'cover',
                  opacity: movie.watched ? 0.6 : 1
                }}
              />
              <h4 style={{ textDecoration: movie.watched ? 'line-through' : 'none' }}>
                {movie.title}
              </h4>
              <p>Release: {movie.release_date || 'N/A'}</p>
              <button onClick={() => toggleWatched(index)}>✅</button>
              <button onClick={() => deleteFromWatchlist(index)}>🗑️</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Watchlist;
