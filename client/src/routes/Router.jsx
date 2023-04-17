import { createBrowserRouter } from 'react-router-dom';

import Login from '../pages/Login/Login.jsx';
import Home from '../pages/Home/Home.jsx';

export const router = createBrowserRouter([
	{ path: '/', element: <Login /> },
	{ path: '/home', element: <Home /> },
]);
