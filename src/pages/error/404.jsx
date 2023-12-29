import React, {useContext, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {observer} from "mobx-react-lite";
import {Context} from '../../index';
import Img404 from '../../images/404.png';
import SuccessButton from '../../components/UI/button/SuccessButton';

const Error_404 = () => {
    const navigate = useNavigate();
    const {store} = useContext(Context);

    const backToHome = () => {
        navigate('/');
    }

    useEffect(() => {
        if (localStorage.getItem('access_token')) {
            store.fetchUser();
        }
    }, []);

    return (
        <div>
            <img src={Img404} alt="Error 404" width={800} style={{opacity: "0.5",}} />
            <div style={{textAlign: 'center'}}>
                <SuccessButton onClick={backToHome}>
                    Back To Home
                </SuccessButton>
            </div>
        </div>
    );
}

export default observer(Error_404);
