import React, {useContext, useState, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {useNavigate, useParams} from 'react-router-dom';
import TopNavbar from '../components/UI/navbar/TopNavbar';
import MovieForm from '../components/MovieForm';
import MovieService from '../services/MovieService';

const EditMovie = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [movie, setMovie] = useState({});

    async function fetchMovie(movieId) {
        try {
            const response = await MovieService.fetchMovie(movieId);
            setMovie(response.data.data);
        } catch (e) {
            console.error(e.message);
        }
      }

    const updateMovie = async (editedMovie) => {
        let response = await MovieService.update(editedMovie);

        if (response.status === 200) {
            navigate('/movies');
        }
    }

    useEffect(() => {
        fetchMovie(params.movieId);
    }, [])

    return (
        <div>
            <TopNavbar showGoBack={true}/>
            <h2 style={{color: 'white', margin: '2rem',}}>Edit movie</h2>
            <MovieForm
                movie={movie}
                update={updateMovie}
            />
        </div>
    );
}

export default observer(EditMovie);
