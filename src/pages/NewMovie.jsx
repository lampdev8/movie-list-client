import React, {useContext} from 'react';
import { Context } from '../index';
import {observer} from "mobx-react-lite";
import {useNavigate} from 'react-router-dom';
import TopNavbar from '../components/UI/navbar/TopNavbar';
import MovieForm from '../components/MovieForm';
import MovieService from '../services/MovieService';

const NewMovie = () => {
    const {store} = useContext(Context);
    const navigate = useNavigate();

    const createMovie = async (newMovie) => {
        let response = await MovieService.create(newMovie);

        if (response.status === 200) {
            navigate('/movies');
        }
    }

    return (
        <div>
            <TopNavbar />
            <h2 style={{color: 'white', margin: '2rem',}}>Create a new movie</h2>
            <MovieForm create={createMovie} />
        </div>
    );
}

export default observer(NewMovie);
