import { useEffect, useState } from 'react';
import Search from './components/search/Search';

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

  const fetchMovies = async () => {
    const endpoint = `${API_BASE_URL}/discover/movie`
    const response = await fetch(endpoint, API_OPTIONS);
    const data = await response.json();
    const movies = data.results;

    if(!response.ok) {
      console.error(`Something went wrong`);
    }

    console.log(movies);
  }
  
  useEffect( () => {
    fetchMovies()
  }, [])

  return (
    <main>
      <div className='pattern' />
        <div className='wrapper'>
          <header>
            <h1>Find <span className="text-gradient">Movies</span> You'll Enjoy Without the Hassle</h1>
            <img src="./hero.png" alt="hero" />
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}></Search>
          </header>
        </div>
    </main>
  )
}

export default App;
