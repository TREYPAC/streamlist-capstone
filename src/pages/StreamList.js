import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/StreamList.css';

const API_KEY = process.env.REACT_APP_TMDB_KEY;


function StreamList() {
  const [popularMovies, setPopularMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
        );
        const data = await response.json();
        setPopularMovies(data.results.slice(0, 6)); // Top 6
      } catch (error) {
        console.error('Failed to fetch popular movies:', error);
      }
    };

    fetchPopularMovies();
  }, []);

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
        flexDirection: 'column',
        alignItems: 'center',
        color: 'white',
        paddingTop: '5rem',
      }}
    >
      <div className="streamlist-content page-overlay fade-in" style={{ textAlign: 'center' }}>
        <h1 className="watchlist-title">Welcome to StreamList 🎬</h1>
        <p>Search for your favorite movies, save them, and build your perfect watchlist.</p>
        <button onClick={() => navigate('/search')} style={{ margin: '1rem', padding: '0.5rem 1rem' }}>
          Start Searching
        </button>

        <h2>🔥 Popular Picks</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}>
          {popularMovies.map((movie) => (
            <div key={movie.id} style={{ width: '160px' }}>
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                style={{ width: '100%', borderRadius: '10px' }}
              />
              <p>{movie.title}</p>
            </div>
          ))}
        </div>
      </div>

      <footer className="footer">
        <p>🎥 StreamList by EZTech &copy; 2025</p>
      </footer>
    </div>
  );
}

export default StreamList;
