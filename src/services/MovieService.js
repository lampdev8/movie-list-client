import $api from "../http";

export default class MovieService {
    static async fetchMovies(dataToFetchMovies) {
        return $api.get('/movies', {
            params: {
                limit: dataToFetchMovies.limit,
                page: dataToFetchMovies.page,
            }
        });
    }

    static async fetchMovie(movieId) {
        return $api.get('/movie/' + movieId);
    }

    static async create(newMovie) {
        return $api.post('/movies', {
            title: newMovie.title,
            year: newMovie.year,
            poster: newMovie.poster,
        });
    }

    static async update(dataToUpdateMovie) {
        return $api.put(`/movies/${dataToUpdateMovie.movieId}`, {
            title: dataToUpdateMovie.title,
            year: dataToUpdateMovie.year,
            poster: dataToUpdateMovie.poster,
        });
    }

    static async remove(movieId) {
        return $api.delete(`/movies/${movieId}`);
    }
}
