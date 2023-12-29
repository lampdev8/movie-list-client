import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {observer} from 'mobx-react-lite';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import AppRouter from './components/AppRouter';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </div>
  );
}

export default observer(App);
