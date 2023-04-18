import { createBrowserRouter } from 'react-router-dom';

import Login from '../pages/Login/Login.jsx';
import Home from '../pages/Home/Home.jsx';
import Dashboard from '../pages/Home/Dashboard/Dashboard.jsx';
import BB from '../pages/Home/Dashboard/BB.jsx';
import NotFound from '../pages/NotFound.jsx';

import { Children } from 'react';

export const router = createBrowserRouter([
	{ path: '/login', element: <Login />, errorElement: <NotFound /> },
	{
		path: '/home',
		element: <Home />,
		errorElement: <NotFound />,
		children: [
			{
				path: 'dashboard',
				element: <Dashboard />,
			},
			{
				path: 'bb',
				element: <BB />,
			},
		],
	},
]);
