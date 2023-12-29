import React, { useContext, useState } from 'react';
import { Context } from '../index';
import {observer} from "mobx-react-lite";
import cl from './MovieForm.module.css';
import FormInput from './UI/input/FormInput';
import SuccessButton from './UI/button/SuccessButton';

const MovieForm = (props) => {
    const {store} = useContext(Context);
    const [movie, setMovie] = useState({
        poster: props.poster !== undefined ? props.poster : null,
        title: props.title !== undefined ? props.title : '',
        year: props.year !== undefined ? props.year : '',
    });

    const addNewMovie = (e) => {
        e.preventDefault();

        props.create(movie);

        setMovie({
            poster: null,
            title: null,
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

    return (
        <div className={cl.formContainer + " d-flex"}>
            <div className={cl.square}>
                {movie.poster !== null && movie.poster.url !== undefined ? <img src={movie.poster.url} alt='poster' className={cl.poster} /> : ''}
            </div>
            <form className={cl.form}>
                <FormInput
                    type="file"
                    onChange={changePosterFile}
                    style={{marginBottom: '1.5rem',}}
                />
                {/* onChange={e => setMovie({...movie, poster: URL.createObjectURL(e.target.files[0])})} */}
                <FormInput
                    onChange={(e) => setMovie({...movie, title: e.target.value})}
                    value={movie.title}
                    type="text"
                    placeholder="Title"
                    style={{marginBottom: '1.5rem',}}
                />
                <FormInput
                    onChange={(e) => setMovie({...movie, year: e.target.value})}
                    value={movie.year}
                    type="number"
                    placeholder="Publishing year"
                    style={{marginBottom: '1.5rem',}}
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
