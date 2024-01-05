import $api from "../http";

export default class MovieService {
    static async fetchMovies(dataToFetchMovies) {
        return $api.get('/movies/', {
            params: {
                search: dataToFetchMovies.search,
                genre: dataToFetchMovies.genre,
                year: dataToFetchMovies.year,
                page: dataToFetchMovies.page,
            }
        });
    }

    static async fetchMovie(movieId) {
        return $api.get('/movie/' + movieId);
    }

    static async create(newMovie) {
        return $api.post('/movie/store', {
            title: newMovie.title,
            genre: newMovie.genre,
            year: newMovie.year,
            poster: newMovie.poster,
        });
    }

    static async update(dataToUpdateMovie) {
        return $api.put(`/movie/${dataToUpdateMovie.id}`, {
            title: dataToUpdateMovie.title,
            genre: dataToUpdateMovie.genre,
            year: dataToUpdateMovie.year,
            poster: dataToUpdateMovie.poster,
        });
    }

    static async remove(movieId) {
        return $api.delete(`/movie/${movieId}`);
    }
}
