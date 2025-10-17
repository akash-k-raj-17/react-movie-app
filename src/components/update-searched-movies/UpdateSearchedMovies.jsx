const UpdatesearchedMovies = async (searchTerm, movies) => {
    try {
        const endpoint = 'http://localhost:3000/api/search'
        const API_OPTIONS = {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({searchTerm, movies})
        }

        const response = await fetch(endpoint, API_OPTIONS);

        if(!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(`search update successful`, data);
        
    } catch (error) {
        console.error('Error updating searched movies:', error);
        throw error;
    }
}

export default UpdatesearchedMovies;