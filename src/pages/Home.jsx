import React, {useContext, useEffect} from 'react';
import { Context } from '../index';
import {observer} from "mobx-react-lite";
import {useNavigate} from 'react-router-dom';

const Home = () => {
    const {store} = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        if (store.isAuth) {
            navigate('/movies');
        } else {
            navigate('/login');
        }
    }, []);

    return (<div></div>);
}

export default observer(Home);
