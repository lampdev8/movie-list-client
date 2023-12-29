import React, {useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import { Context } from '../../../index';
import {observer} from "mobx-react-lite";
import IconButton from "../button/IconButton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const TopNavbar = () => {
    const {store} = useContext(Context);
    const navigate = useNavigate();

    const toMovies = () => {
        navigate(-1);
    }

    const logout = (e) => {
        e.preventDefault();
        store.setAuth(false);
        store.logout();
        navigate('/');
      }

    return (
        <div className="d-flex separate_element" >
              <IconButton>
                  <div className="d-flex" onClick={toMovies}>
                    <FontAwesomeIcon
                      icon={faArrowLeft}
                    />
                    <h6 style={{color: 'white', margin: 'unset', }}>
                        &nbsp; Go Back
                    </h6>
                  </div>
              </IconButton>
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
    );
}

export default observer(TopNavbar);
