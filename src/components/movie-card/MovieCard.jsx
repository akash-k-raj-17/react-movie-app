function MovieCard({movie}) {
    
    const {poster_path, title, id, vote_average, original_language, release_date} = movie

    return (
    <div key={id} className='movie-card'>
    <   img src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : '/no-png'} alt={title} />
        <h3>{title}</h3>
        <div className='content'>
            <div className="rating">
                <img src="/star.svg" alt="star" />
                <p>{vote_average.toFixed(1)}</p>
            </div>
            <p className="text-white">•</p>
            <p className="lang">{original_language}</p>
            <p className="text-white">•</p>
            <p className="year">{release_date.split('-')[0]}</p>
        </div>
    </div>
  )
}

export default MovieCard
