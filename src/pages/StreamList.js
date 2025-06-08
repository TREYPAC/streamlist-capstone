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
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
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
      {/* Welcome Message & CTA */}
      <div className="streamlist-content page-overlay fade-in" style={{ textAlign: 'center' }}>
        <h1 className="watchlist-title" style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
          Welcome to StreamList <span role="img" aria-label="clapperboard">🎬</span>
        </h1>
        <p style={{ fontSize: '1.1rem' }}>
          Search, save, and build your ultimate streaming queue.
        </p>

        <button
          onClick={() => navigate('/search')}
          style={{
            margin: '1rem',
            padding: '0.6rem 1.2rem',
            fontSize: '1rem',
            backgroundColor: '#00cfff',
            color: '#000',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Start Searching
        </button>

        {/* Popular Picks Section */}
        <h2 style={{ marginTop: '2rem' }}>🔥 Popular Picks</h2>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '1rem',
            marginTop: '1rem'
          }}
        >
          {popularMovies.map((movie) => (
            <div key={movie.id} style={{ width: '150px', textAlign: 'center' }}>
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                style={{
                  width: '100%',
                  height: '225px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                }}
              />
              <p style={{ marginTop: '0.5rem', fontSize: '0.95rem' }}>{movie.title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="footer" style={{ marginTop: 'auto', padding: '1rem 0', color: '#ccc' }}>
        <p>🎥 StreamList by EZTech &copy; 2025</p>
      </footer>
    </div>
  );
}

export default StreamList;
