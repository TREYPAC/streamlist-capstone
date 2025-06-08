import React, { useEffect, useState, useContext } from 'react';
import { WatchlistContext } from '../context/WatchlistContext';

const TMDB_API_KEY = process.env.REACT_APP_TMDB_KEY;

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [genreFilter, setGenreFilter] = useState('All');
  const [sortOption, setSortOption] = useState('title');
  const { addToWatchlist } = useContext(WatchlistContext);

  const genreMap = {
    28: 'Action',
    35: 'Comedy',
    878: 'Sci-Fi',
    18: 'Drama',
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`)
      .then(res => res.json())
      .then(data => {
        const transformed = data.results.map(movie => ({
          id: movie.id,
          title: movie.title,
          genre_ids: movie.genre_ids,
          release_date: movie.release_date || '',
          image: movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : 'https://via.placeholder.com/300x450?text=No+Image',
        }));
        setMovies(transformed);
      })
      .catch(err => console.error("TMDB Fetch error:", err));
  }, []);

  const handleGenreChange = (e) => setGenreFilter(e.target.value);
  const handleSortChange = (e) => setSortOption(e.target.value);

  const filtered = movies
    .filter(movie =>
      genreFilter === 'All' ||
      movie.genre_ids?.some(id => genreMap[id] === genreFilter)
    )
    .sort((a, b) => {
      if (sortOption === 'title') return a.title.localeCompare(b.title);
      if (sortOption === 'year') return parseInt(b.release_date) - parseInt(a.release_date);
      return 0;
    });

  return (
    <div style={{ padding: '40px' }}>
      <h2 style={{ marginBottom: '10px' }}>🎬 Browse Movies</h2>
      <p style={{ fontSize: '1rem', maxWidth: '700px', marginBottom: '30px', color: '#444' }}>
        These recommendations are based on your recent searches, saved watchlist items, and trending titles across the platform.
        The more you interact, the better your suggestions will get!
      </p>

      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
        <select onChange={handleGenreChange} value={genreFilter}>
          <option value="All">All Genres</option>
          <option value="Action">Action</option>
          <option value="Comedy">Comedy</option>
          <option value="Sci-Fi">Sci-Fi</option>
          <option value="Drama">Drama</option>
        </select>

        <select onChange={handleSortChange} value={sortOption}>
          <option value="title">Sort by Title</option>
          <option value="year">Sort by Release Year</option>
        </select>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '24px'
      }}>
        {filtered.map(movie => (
          <div key={movie.id} style={{
            background: '#fff',
            borderRadius: '10px',
            padding: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            textAlign: 'center'
          }}>
            <img
              src={movie.image}
              alt={movie.title}
              style={{ width: '100%', height: '280px', objectFit: 'cover', borderRadius: '8px' }}
            />
            <h4 style={{ margin: '10px 0 5px' }}>{movie.title}</h4>
            <p style={{ fontSize: '0.85rem', color: '#666' }}>
              {movie.release_date ? `Release: ${movie.release_date}` : 'Release: N/A'}
            </p>
            {movie.genre_ids.length > 0 && (
              <p style={{ fontSize: '0.75rem', color: '#888' }}>
                {genreMap[movie.genre_ids[0]]}
              </p>
            )}

            <button
              onClick={() =>
                addToWatchlist({
                  id: movie.id,
                  title: movie.title,
                  image: movie.image,
                  release_date: movie.release_date
                })
              }
              style={{
                marginTop: '10px',
                padding: '6px 12px',
                backgroundColor: '#007bff',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '0.85rem'
              }}
            >
              Save to Watchlist
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
