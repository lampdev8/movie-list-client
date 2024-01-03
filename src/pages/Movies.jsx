import React, {useContext, useEffect, useState} from 'react';
import { Context } from '../index';
import {observer} from "mobx-react-lite";
import {useNavigate} from 'react-router-dom';
import TopNavbar from '../components/UI/navbar/TopNavbar';
import MovieService from '../services/MovieService';
import SuccessButton from '../components/UI/button/SuccessButton';
import Pagination from '../components/UI/pagination/Pagination';
import ConfirmationModal from '../components/UI/modal/ConfirmationModal';
import MovieList from '../components/MovieList';

const Movies = () => {
    const {store} = useContext(Context);
    const navigate = useNavigate();
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [visibleConfirmationModal, setVisibleConfirmationModal] = useState(false);

    async function fetchMovies(page) {
      try {
          const response = await MovieService.fetchMovies({
              page: page,
          });

          setMovies(response.data.data.data);
          setCurrentPage(response.data.data.current_page);
          setLastPage(response.data.data.last_page);
      } catch (e) {
          console.error(e.message);
      }
    }

    const addMovie = () => {
      navigate('/movies/new');
    }

    const selectPage = async (page) => {
      setCurrentPage(page);
      await fetchMovies(page);
    }

    const removeConfirmation = (movie) => {
      setSelectedMovie(movie);
      setVisibleConfirmationModal(true);
    }

    const deleteMovie = async () => {
      await MovieService.remove(selectedMovie.id)
      setVisibleConfirmationModal(false);
      fetchMovies(1);
      setCurrentPage(1);
      setSelectedMovie(null);
    }

    useEffect(() => {
        if (localStorage.getItem('access_token')) {
          store.fetchUser();
          fetchMovies(currentPage);
        }
      }, []);

    return (
        <div>
          <TopNavbar showGoBack={false} />

          {movies !== undefined && movies.length === 0 ?
            <div style={{margin: 'auto', marginTop: '7rem', textAlign: 'center',}}>
              <h2 style={{color: 'white',}}>
                Your movie list is empty
              </h2>
              <div>
                <SuccessButton
                  onClick={addMovie}
                >
                  Add a new Movie
                </SuccessButton>
              </div>
            </div> : <div>
              <h2 style={{color: 'white',}}>My Movies</h2>
              <SuccessButton
                onClick={addMovie}
              >
                Add Movie
              </SuccessButton>

              <MovieList
                movies={movies}
                remove={removeConfirmation}
              />

              <Pagination
                currentPage={currentPage}
                lastPage={lastPage}
                selectPage={selectPage}
              />
            </div>
          }

          <ConfirmationModal
            visible={visibleConfirmationModal}
            setVisible={setVisibleConfirmationModal}
            title='Delete movie'
            content={`
              Are you sure you want to delete ${
                selectedMovie !== null ? selectedMovie.title : ''
              } movie?
            `}
            confirmAction={deleteMovie}
          />
        </div>
    );
}

export default observer(Movies);
