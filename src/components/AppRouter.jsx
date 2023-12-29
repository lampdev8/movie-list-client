import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from '../index';
import {Routes, Route, Navigate} from 'react-router-dom';
import Movies from '../pages/Movies';
import Movie from '../pages/Movie';
import Login from '../pages/auth/Login';
import NewMovie from '../pages/NewMovie';
import Error404 from '../pages/error/404';

const AppRouter = () => {
    const {store} = useContext(Context);

    return (
        <Routes>
            <Route
                path="/"
                element={store.isAuth ?
                    <Navigate to="/movies" /> :
                    <Navigate to="/login" />
                  }
            />
          <Route
            path="/movies"
            element={store.isAuth ? <Movies /> : <Navigate to="/login" />}
          />
          <Route
            path="/movies/new"
            element={store.isAuth ? <NewMovie /> : <Navigate to="/login" />}
          />
          <Route
            path="/movie/:movieId"
            element={store.isAuth ? <Movie /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={store.isAuth && store.user.email_verified_at ?
              <Navigate to="/movies" /> :
              <Login />
            }
          />
          <Route path="*" element={<Error404 />} />
        </Routes>
    );
}

export default observer(AppRouter);
