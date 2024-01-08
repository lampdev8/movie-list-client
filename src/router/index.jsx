import Error404 from '../pages/error/404';
import Home from '../pages/Home';
import Login from '../pages/auth/Login';
import Movies from '../pages/Movies';
import NewMovie from '../pages/NewMovie';
import EditMovie from '../pages/EditMovie';

export const sharedRoutes = [
    {path: '/', element: <Home />},
    {path: '*', element: <Error404 />},
];

export const publicRoutes = [
    {path: '/login', element: <Login />},
]

export const privateRoutes = [
    {path: '/movies', element: <Movies />},
    {path: '/movies/new', element: <NewMovie />},
    {path: '/movies/edit/:movieId', element: <EditMovie />},
];
