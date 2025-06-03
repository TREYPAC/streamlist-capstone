import React, { useState, useEffect } from 'react';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(() => {
    const saved = localStorage.getItem('tmdbResults');
    return saved ? JSON.parse(saved) : [];
  });

  const API_KEY = 'cacf01236ab904e663b33acec17311af';

  const searchMovies = async () => {
    if (!query) return;
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
    );
    const data = await response.json();
    setResults(data.results || []);
    localStorage.setItem('tmdbResults', JSON.stringify(data.results || []));
    localStorage.setItem('tmdbQuery', query);
  };

  useEffect(() => {
    const savedQuery = localStorage.getItem('tmdbQuery');
    const savedResults = localStorage.getItem('tmdbResults');

    if (savedQuery) setQuery(savedQuery);
    if (savedResults) setResults(JSON.parse(savedResults));
  }, []);

  const saveToWatchlist = (movie) => {
    const existing = JSON.parse(localStorage.getItem('watchlist')) || [];
    const alreadySaved = existing.some((item) => item.id === movie.id);

    if (!alreadySaved) {
      const updated = [...existing, movie];
      localStorage.setItem('watchlist', JSON.stringify(updated));
      alert(`${movie.title} added to your watchlist!`);
    } else {
      alert(`${movie.title} is already in your watchlist.`);
    }
  };

  return (
    <div>
      <h2>Search Movies</h2>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter movie name"
      />
      <button onClick={searchMovies}>Search</button>

      {results.length > 0 && <h3>Showing results for: {query}</h3>}

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1rem' }}>
        {results.map((movie) => (
          <div key={movie.id} style={{ width: '200px' }}>
            {movie.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                style={{ width: '100%', borderRadius: '6px' }}
              />
            )}
            <h4>{movie.title}</h4>
            <p>Release: {movie.release_date}</p>
            <button onClick={() => saveToWatchlist(movie)}>Save to Watchlist</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
