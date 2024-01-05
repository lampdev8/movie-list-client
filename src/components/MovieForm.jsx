import React, { useState, useEffect } from 'react';
import {observer} from "mobx-react-lite";
import cl from './MovieForm.module.css';
import FormInput from './UI/input/FormInput';
import Select from './UI/select/Select';
import SuccessButton from './UI/button/SuccessButton';
import GenreService from '../services/GenreService';

const MovieForm = (props) => {
    const [movie, setMovie] = useState({
        id: null,
        poster: null,
        title: null,
        genre: null,
        year: null,
    });
    const [genres, setGenres] = useState([]);

    async function fetchGenres() {
        try {
          const response = await GenreService.fetchGenres();
          setGenres(GenreService.getGenresForSelect(response.data.data));
        } catch (e) {
          console.error(e.message);
        }
      }

    const addNewMovie = (e) => {
        e.preventDefault();

        let newMovie = movie;

        if (!movie.genre) {
            newMovie.genre = genres.length > 0 ? genres[0].value : '';
        }

        props.create(newMovie);

        setMovie({
            id: null,
            poster: null,
            title: null,
            genre: null,
            year: null,
        });
    }

      const updateMovie = (e) => {
        e.preventDefault();

        props.update(movie);
    }

    const toBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    const changePosterFile = async (e) => {
        const file = e.target.files[0];
        let poster = {};
        poster.url = URL.createObjectURL(file);
        poster.file = await toBase64(file);
        poster.name = file.name;
        poster.size = file.size;
        poster.type = file.type;

        setMovie({...movie, poster: poster});
    }

    useEffect(() => {
        fetchGenres();
    }, []);

    useEffect(() => {
        if (props.movie !== undefined) {
            let movieData = props.movie;
            movieData.genre = props.movie.genre_id;
            setMovie(movieData);
        }
    }, [props.movie])

    return (
        <div className={cl.formContainer + " d-flex"}>
            <div className={cl.square}>
                {Object.keys(movie).length !== 0 && movie.poster !== null ?
                    typeof movie.poster === "object" && movie.poster.url !== undefined ? <img src={movie.poster.url} alt='poster' className={cl.poster} /> :
                    typeof movie.poster === "string" ? <img src={movie.poster} alt='poster' className={cl.poster} /> :
                    '' :
                ''}
            </div>
            <form className={cl.form}>
                <FormInput
                    type="file"
                    onChange={changePosterFile}
                    style={{marginBottom: '1.5rem',}}
                />
                <FormInput
                    onChange={(e) => setMovie({...movie, title: e.target.value})}
                    value={movie.title}
                    type="text"
                    placeholder="Title"
                    style={{marginBottom: '1.5rem',}}
                />
                <Select
                    options={genres}
                    value={movie.genre}
                    onChange={ (genre) => {setMovie({...movie, genre: genre})} }
                />
                <FormInput
                    onChange={(e) => setMovie({...movie, year: e.target.value})}
                    value={movie.year}
                    type="number"
                    placeholder="Publishing year"
                    style={{marginTop: '1.5rem', marginBottom: '1.5rem',}}
                />

                <div style={{textAlign: 'end',}}>
                    {props.create !== undefined && <SuccessButton
                        onClick={addNewMovie}>Create
                    </SuccessButton>
                    }
                    {props.update !== undefined && <SuccessButton
                        onClick={updateMovie}>Update
                    </SuccessButton>
                    }
                </div>
            </form>
        </div>
    );
}

export default observer(MovieForm);
