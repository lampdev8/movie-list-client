import React from 'react';
import cl from './MovieCard.module.css';
import IconButton from './UI/button/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

const MovieCard = (props) => {
    const edit = () => {
        console.log('edit movie');
    }

    const remove = () => {
        console.log('remove movie');
    }

    return (
        <div className={cl.container}>
            <div className={cl.imageContainer}>
                <img className={cl.image} src={props.movie.poster} alt="poster" />
            </div>
            <h5 className={cl.text}>{props.movie.title}</h5>
            <div className="d-flex">
                <div className={cl.text}>{props.movie.year}</div>
                <div className={cl.text + ' d-flex right-align'} >
                    <IconButton style={{marginLeft: '0.2rem', marginRight: '0.2rem',}} onClick={edit} title="Edit Movie">
                        <FontAwesomeIcon
                            icon={faPenToSquare}
                        />
                    </IconButton>
                    <IconButton style={{marginLeft: '0.2rem', marginRight: '0.2rem',}} onClick={remove} title="Delete Movie">
                        <FontAwesomeIcon
                            icon={faTrashCan}
                        />
                    </IconButton>
                </div>
            </div>
        </div>
    );
}

export default MovieCard;
