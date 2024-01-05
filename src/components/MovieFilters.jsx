import React, { useState, useEffect } from 'react';
import Select from './UI/select/Select';
import FormInput from './UI/input/FormInput';
import IconButton from './UI/button/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import SuccessButton from './UI/button/SuccessButton';
import SecondaryButton from './UI/button/SecondaryButton';
import GenreService from '../services/GenreService';

const MovieFilters = ({
    filters,
    setFilters,
    setCurrentPage,
    fetchMovies,
}) => {
  const [genres, setGenres] = useState([]);

  const clearFilters = () => {
    setFilters({
      search: '',
      genre: '',
      year: '',
    });
  }

  async function fetchGenres() {
    try {
      const response = await GenreService.fetchGenres();
      setGenres(GenreService.getGenresForSelect(response.data.data));
    } catch (e) {
      console.error(e.message);
    }
  }

  useEffect(() => {
    fetchGenres();
  }, []);

  return (
    <div className='d-flex'>
      <div>
        <div className='d-flex'>
          <FormInput
            type="text"
            placeholder="Search..."
            value={filters.search}
            onChange={(e) => setFilters({...filters, search: e.target.value})}
          />
          {filters.search.length > 0 &&
            <IconButton onClick={() => setFilters({...filters, search: ''})} title="Clear Search">
              <FontAwesomeIcon
                  icon={faXmark}
                  style={{width: 20, height: 20, marginTop: 17,}}
              />
            </IconButton>
          }
        </div>
      </div>
      <div>
        <Select
          defaultValue="All Genres"
          options={genres}
          value={filters.genre}
          onChange={ (genre) => {setFilters({...filters, genre: genre})} }
        />
      </div>
      <div>
        <FormInput
          type="number"
          placeholder="All Years"
          value={filters.year}
          onChange={(e) => setFilters({...filters, year: e.target.value})}
        />
      </div>
      {
        (
          filters.search.length > 0 ||
          filters.genre.length > 0 ||
          filters.year.length > 0
        ) &&
        <SecondaryButton
          onClick={() => {
            clearFilters();
            setCurrentPage(1);
            fetchMovies({
              search: '',
              genre: '',
              year: '',
            }, 1);
          }}
        >
          Clear Filters
        </SecondaryButton>
      }
      <div>
        <SuccessButton onClick={() => {
            setCurrentPage(1);
            fetchMovies({
              search: filters.search,
              genre: filters.genre,
              year: filters.year,
            }, 1);
          }}
        >
          Find
        </SuccessButton>
      </div>
    </div>
  );
}

export default MovieFilters;
