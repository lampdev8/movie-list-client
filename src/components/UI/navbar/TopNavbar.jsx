import React, {useContext, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { Context } from '../../../index';
import {observer} from "mobx-react-lite";
import cl from './TopNavbar.module.css';
import IconButton from "../button/IconButton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import ConfirmationModal from '../modal/ConfirmationModal';

const TopNavbar = ({showGoBack}) => {
    const {store} = useContext(Context);
    const navigate = useNavigate();
    const [visibleConfirmationModal, setVisibleConfirmationModal] = useState(false);

    const goBack = () => {
        navigate(-1);
    }

    const logoutConfirmation = () => {
      setVisibleConfirmationModal(true);
    }

    const logout = (e) => {
        e.preventDefault();
        setVisibleConfirmationModal(false);
        store.setAuth(false);
        store.logout();
        navigate('/');
      }

    return (
      <div>
        <div className={cl.navbarPanel} >
          {showGoBack !== undefined && showGoBack &&
            <IconButton>
                <div className="d-flex" onClick={goBack}>
                  <FontAwesomeIcon
                    icon={faArrowLeft}
                  />
                  <h6 className={cl.navbarLabel}>
                      &nbsp; Go Back
                  </h6>
                </div>
            </IconButton>
          }

          <IconButton style={{marginLeft: 'auto'}}>
              <div className="d-flex" onClick={logoutConfirmation}>
                <h6 className={cl.navbarLabel}>
                  Log Out &nbsp;
                </h6>
                <FontAwesomeIcon
                  icon={faArrowRightFromBracket}
                />
              </div>
          </IconButton>
        </div>
        <ConfirmationModal
          visible={visibleConfirmationModal}
          setVisible={setVisibleConfirmationModal}
          title='Log Out'
          content={'Are you sure you want to log out?'}
          confirmAction={logout}
        />
      </div>
    );
}

export default observer(TopNavbar);
