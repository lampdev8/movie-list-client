import React, {useContext, useEffect, useState} from 'react';
import { Context } from '../index';
import {observer} from "mobx-react-lite";
import {useNavigate} from 'react-router-dom';

const Movie = () => {
    const {store} = useContext(Context);
    const navigate = useNavigate();

    return (
        <div></div>
    );
}

export default observer(Movie);
