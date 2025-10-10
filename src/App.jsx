import { useEffect, useState } from 'react';
import Search from './components/search/Search';
import Spinner from './components/search/spinner/Spinner';

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

  const fetchMovies = async () => {
    try {

      const endpoint = `${API_BASE_URL}/discover/movie`
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
    fetchMovies()
  }, [])

  return (
    <main>
      <div className='pattern' />
        <div className='wrapper'>
          <header className='header'>
            <h1>Find <span className="text-gradient">Movies</span> You'll Enjoy Without the Hassle</h1>
            <img src="./hero.png" alt="hero" />
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}></Search>
          </header>
          <section className='all-movies'>
            <h2>All Movies</h2>
            {
              isLoading ? (
                <Spinner/>
              ) :
                <div className='movie-grid'>
                  {
                    movies.map((movie) => (
                      <div key={movie.id} className='movie-card'>
                        <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : '/no-movie.png'} alt={movie.title} />
                        <div className='content'>
                          <h3>{movie.title}</h3>
                        </div>
                      </div>
                    ))
                  }
                </div>
            }
          </section>
        </div>
    </main>
  )
}

export default App;
