import logo from './github-logo.png';
import './App.css';
import { useEffect, useState } from 'react';
import MovieCard from './components/MovieCard';

const API_URL = 'http://www.omdbapi.com/?apikey=YOUR_API_KEY';

const App = () => {
  const [title, setTitle] = useState('');
  const [moviedata, setMovieData] = useState(false);
  const [loader, setLoader] = useState(null);

  const searchMovies = async (title) => {
    if (title !== '') {
      setLoader(true);
      const response = await fetch(`${API_URL}&s=${title}`);
      const result = await response.json();
      setMovieData(result.Search);
      console.log(result.Search);
      if (typeof result.Search === 'undefined') {
        setLoader(false);
      }
      
    }
    if (title === '' && typeof moviedata === 'undefined') {
      setLoader(null);
    }
  };

  useEffect(() => {
    searchMovies(title);
  }, [title]);

  return (<div className='app'>
    <h1>Movie Max</h1>
    <div className='search'>
      <input
        placeholder='Search Movies'
        value={title}
        onChange={(event) => { setTitle(event.target.value) }}
      />
    </div>

    {moviedata ? (
      <div className='container'>
        {
          Object.values(moviedata).map((movie, index) =>
            (<MovieCard key={index} movie={movie} />))
        }

      </div>
    ) :
      <div className='empty'>
        <h2> {loader == null ? "Search for a movie..." : (loader ? "Loading..." : "No movies found")}</h2>
      </div>
    }
<div className='bottom-credit'>
  <a href='https://github.com/zelva3/movies_max_reactjs' target="_blank">
    <img src={logo} alt="Zelva"/>
    <h5>Zelva</h5>
    </a>
</div>
  </div>);
};

export default App;

