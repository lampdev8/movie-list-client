import React, {useContext, useEffect, useState} from 'react';
import { Context } from '../index';
import {observer} from "mobx-react-lite";
import {useNavigate} from 'react-router-dom';
import MovieService from '../services/MovieService';
import SuccessButton from '../components/UI/button/SuccessButton';
import IconButton from '../components/UI/button/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import MovieCard from '../components/MovieCard';
import Pagination from '../components/UI/pagination/Pagination';

const Movies = () => {
    const {store} = useContext(Context);
    const navigate = useNavigate();
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

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

    const logout = (e) => {
      e.preventDefault();
      store.setAuth(false);
      store.logout();
      navigate('/');
    }

    const addMovie = () => {
      navigate('/movies/new');
    }

    const selectPage = async (page) => {
      setCurrentPage(page);
      await fetchMovies(page);
    }

    useEffect(() => {
        if (localStorage.getItem('access_token')) {
          store.fetchUser();
          fetchMovies(currentPage);
        }
      }, []);

    return (
        <div>
          <div className="d-flex separate_element right-align" >
              <div>&nbsp;</div>
              <IconButton style={{marginLeft: 'auto'}}>
                  <div className="d-flex" onClick={logout}>
                    <h6 style={{color: 'white', margin: 'unset', }}>
                      Log Out &nbsp;
                    </h6>
                    <FontAwesomeIcon
                      icon={faArrowRightFromBracket}
                    />
                  </div>
              </IconButton>
          </div>

          {movies !== undefined && movies.length === 0 ? <div style={{margin: 'auto', marginTop: '7rem', textAlign: 'center',}}>
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

              <div className="d-flex flex-wrap">
                {movies.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                  />
                ))}
              </div>

              <Pagination
                currentPage={currentPage}
                lastPage={lastPage}
                selectPage={selectPage}
              />
            </div>
          }
        </div>
    );
}

export default observer(Movies);
