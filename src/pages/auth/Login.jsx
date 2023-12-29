import React, {useContext, useEffect} from 'react';
import { Context } from '../../index';
import {observer} from "mobx-react-lite";
import {useNavigate} from 'react-router-dom';
import cl from './Login.module.css';
import LoginForm from '../../components/LoginForm';

const Login = () => {
    const {store} = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        if (store.isAuth) {
            navigate('/movies');
        }
    }, [store.isAuth])

    return (
        <div className={cl.loginContainer}>
            <h2 className={cl.loginTitle}>Sign In</h2>
            <div>
                <LoginForm />
            </div>
        </div>
    );
}

export default observer(Login);
