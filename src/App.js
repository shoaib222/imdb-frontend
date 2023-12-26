import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [movies, setMovies] = useState([]);
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    // Fetch movies
    axios.get('http://localhost:3001/movies')
      .then(response => setMovies(response.data))
      .catch(error => console.error(error));

    // Fetch artists
    axios.get('http://localhost:3001/artists')
      .then(response => setArtists(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>IMDB Database</h1>

      <h2>Movies</h2>
      <ul>
        {movies.map(movie => (
          <li key={movie._id}>
            <strong>{movie.title}</strong>
            <ul>
              {movie.genres.map(genre => (
                <li key={genre}>{genre}</li>
              ))}
            </ul>
            <div>
              <strong>Media:</strong>
              <ul>
                {movie.media.map((m, index) => (
                  <li key={index}>{m.type}: {m.url}</li>
                ))}
              </ul>
            </div>
            <div>
              <strong>Reviews:</strong>
              <ul>
                {movie.reviews.map((review, index) => (
                  <li key={index}>{review.content} (User ID: {review.userId})</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>

      <h2>Artists</h2>
      <ul>
        {artists.map(artist => (
          <li key={artist._id}>
            <strong>{artist.name}</strong>
            <ul>
              {artist.skills.map(skill => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
            <div>
              <strong>Roles:</strong>
              <ul>
                {artist.roles.map((role, index) => (
                  <li key={index}>{role.role} in {role.movieId}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;