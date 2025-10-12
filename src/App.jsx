import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

import Search from './components/search/Search';
import Spinner from './components/spinner/Spinner';
import MovieCard from './components/movie-card/MovieCard';

const API_BASE_URL = `https://api.themoviedb.org/3`;
const API_OPTIONS = {
  method : 'GET',
  headers : {
    'Authorization' : `Bearer ${import.meta.env.VITE_API_KEY}`,
    'Content-Type' : 'application/json'
  }
}

function App() {

  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500)

  const fetchMovies = async (query = '') => {
    try {

      const endpoint = query ? `https://api.themoviedb.org/3/search/movie?query=${query}` : `${API_BASE_URL}/discover/movie`
      const response = await fetch(endpoint, API_OPTIONS);
      const data = await response.json();

      if(!response.ok) {
        setMovies([]);
        setIsLoading(false)
      }

      setMovies(data.results ? data.results : [])
      setIsLoading(false)
      
    } catch (error) {
      console.error(error);
    }

    finally {
      setIsLoading(false);
    }
  }
  
  useEffect( () => {
    fetchMovies(debouncedSearchTerm)
  }, [debouncedSearchTerm])

  const handleChange = (e) => {
    setSearchTerm(e.target.value)
  }

  return (
    <main>
      <div className='pattern' />
        <div className='wrapper'>
          <header className='header'>
            <h1>Find <span className="text-gradient">Movies</span> You'll Enjoy Without the Hassle</h1>
            <img src="./hero.png" alt="hero" />
            <Search searchTerm={searchTerm} onChange={handleChange}></Search>
          </header>
          <section className='all-movies'>
            <h2>All Movies</h2>
            {
              isLoading ? (
                <Spinner/>
              ) :
                <ul className='movie-grid'>
                  {
                    movies.map((movie) => (
                      <li key={movie.id}>
                        <MovieCard movie={movie}/>
                      </li>
                    ))
                  }
                </ul>
            }
          </section>
        </div>
    </main>
  )
}

export default App;
