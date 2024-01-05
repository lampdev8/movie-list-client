import $api from "../http";

export default class GenreService {
    static async fetchGenres() {
        return $api.get('/genres');
    }

    static getGenresForSelect(genreObjects) {
        let genresArray = [];

        for (let [index, values] of Object.entries(genreObjects)) {
            genresArray.push({
                value: values.id,
                name: values.name[0].toUpperCase() + values.name.substring(1),
            });
        }

        return genresArray;
    }
}
