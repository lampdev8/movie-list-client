import React, {useContext, useEffect, useState, useRef} from 'react';
import { Context } from '../index';
import {observer} from "mobx-react-lite";
import {useNavigate} from 'react-router-dom';
import TopNavbar from '../components/UI/navbar/TopNavbar';
import MovieService from '../services/MovieService';
import SuccessButton from '../components/UI/button/SuccessButton';
import Pagination from '../components/UI/pagination/Pagination';
import ConfirmationModal from '../components/UI/modal/ConfirmationModal';
import MovieFilters from '../components/MovieFilters';
import MovieList from '../components/MovieList';

const Movies = () => {
    const {store} = useContext(Context);
    const navigate = useNavigate();
    const [filters, setFilters] = useState({
      search: '',
      genre: '',
      year: '',
    });
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [visibleConfirmationModal, setVisibleConfirmationModal] = useState(false);
    const timestamp = useRef(0);

    async function fetchMovies(filters, page) {
      try {
        let requestParams = filters;
        requestParams.page = page;

        const response = await MovieService.fetchMovies(requestParams);

        setMovies(response.data.data.data);
        setCurrentPage(response.data.data.current_page);
        setLastPage(response.data.data.last_page);
        timestamp.current = new Date().getTime();
      } catch (e) {
          console.error(e.message);
      }
    }

    const addMovie = () => {
      navigate('/movies/new');
    }

    const selectPage = async (page) => {
      setCurrentPage(page);
      await fetchMovies(filters, page);
    }

    const removeConfirmation = (movie) => {
      setSelectedMovie(movie);
      setVisibleConfirmationModal(true);
    }

    const deleteMovie = async () => {
      await MovieService.remove(selectedMovie.id)
      setVisibleConfirmationModal(false);
      fetchMovies(filters, 1);
      setCurrentPage(1);
      setSelectedMovie(null);
    }

    useEffect(() => {
        if (localStorage.getItem('access_token')) {
          store.fetchUser();
          fetchMovies(filters, currentPage);
        }
      }, []);

    return (
        <div>
          <TopNavbar showGoBack={false} />

          <h2 style={{color: 'white',}}>Movies</h2>
          <SuccessButton
            onClick={addMovie}
          >
            Add Movie
          </SuccessButton>

          <div className='separate_element'>
            <MovieFilters
              filters={filters}
              setFilters={setFilters}
              setCurrentPage={setCurrentPage}
              fetchMovies={fetchMovies}
            />
          </div>

          {movies !== undefined && movies.length === 0 ?
            <div style={{margin: 'auto', marginTop: '7rem', textAlign: 'center',}}>
              <h2 style={{color: 'white',}}>
                There are no movies available
              </h2>
            </div> : <div>
              <MovieList
                movies={movies}
                remove={removeConfirmation}
              />

              <Pagination
                currentPage={currentPage}
                lastPage={lastPage}
                selectPage={selectPage}
                key={`pagination_${timestamp.current}`}
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
