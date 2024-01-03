import React from 'react';
import MovieCard from './MovieCard';

const MovieList = ({movies, remove}) => {
    return (
        <div
            style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            {movies.map((movie) => (
                <MovieCard
                    key={movie.id}
                    movie={movie}
                    remove={remove}
                />
            ))}
        </div>
    );
}

export default MovieList;
