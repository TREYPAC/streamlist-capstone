import React, { useState } from 'react';
import '../styles/StreamList.css';

function StreamList() {
  const [movies, setMovies] = useState([]);
  const [newMovie, setNewMovie] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState('');

  const addMovie = () => {
    if (newMovie.trim() !== '') {
      setMovies([...movies, { text: newMovie, completed: false }]);
      setNewMovie('');
    }
  };

  const toggleComplete = (index) => {
    const updated = [...movies];
    updated[index].completed = !updated[index].completed;
    setMovies(updated);
  };

  const deleteMovie = (index) => {
    const updated = movies.filter((_, i) => i !== index);
    setMovies(updated);
  };

  const startEditing = (index) => {
    setEditingIndex(index);
    setEditingText(movies[index].text);
  };

  const saveEdit = (index) => {
    const updated = [...movies];
    updated[index].text = editingText;
    setMovies(updated);
    setEditingIndex(null);
    setEditingText('');
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
        <h1 className="watchlist-title">My Watchlist <span>❤️</span></h1>
        <input
          type="text"
          placeholder="Add a movie..."
          value={newMovie}
          onChange={(e) => setNewMovie(e.target.value)}
        />
        <button onClick={addMovie}>Add</button>

        <ul>
          {movies.map((movie, index) => (
            <li
              key={index}
              className={movie.completed ? 'completed' : ''}
            >
              {editingIndex === index ? (
                <>
                  <input
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                  />
                  <button onClick={() => saveEdit(index)}>💾</button>
                </>
              ) : (
                <>
                  {movie.text}
                  {movie.completed && <span className="watched-tag"> (Watched)</span>}
                  <button onClick={() => toggleComplete(index)}>✅</button>
                  <button onClick={() => startEditing(index)}>✏️</button>
                  <button onClick={() => deleteMovie(index)}>🗑️</button>
                  
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
      <footer className="footer">
  <p>🎥 StreamList by EZTech &copy; 2025</p>
</footer>
    </div>
  );
}

export default StreamList;

