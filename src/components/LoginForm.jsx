import React, {useContext, useState} from 'react';
import { Context } from '../index';
import {observer} from "mobx-react-lite";
import FormInput from './UI/input/FormInput';
import SuccessButton from './UI/button/SuccessButton';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {store} = useContext(Context);
    const [errorMessage, setErrorMessage] = useState('');

    const login = () => {
        if (email.length === 0) {
            setErrorMessage('Please enter an email');
            return;
        }

        if (password.length === 0) {
            setErrorMessage('Please enter a password');
            return;
        }

        store.login(email, password, setErrorMessage);
    }

    return (
        <div>
            <FormInput
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="text"
                placeholder="Email"
            />
            <FormInput
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Password"
            />
            {errorMessage.length > 0 && <p
                    style={{color: 'coral', margin: '1rem',}}
                >
                    {errorMessage}
                </p>
            }

            <SuccessButton onClick={login}>Log In</SuccessButton>
        </div>
    );
};

export default observer(LoginForm);