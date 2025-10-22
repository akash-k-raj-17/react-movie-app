const TrendingMovies = async() => {
    try {
        const ENDPOINT = 'http://localhost:3000/api/movies'
        const API_OPTIONS = {
        method : 'GET',
        headers : {
            'Content-Type' : 'application/json'
            }
        }

        const response = await fetch(ENDPOINT, API_OPTIONS);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching your favourite movies:', error);
        throw error;
    }
}

export default TrendingMovies;