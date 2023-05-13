import { createBrowserRouter, Navigate } from 'react-router-dom';

import NotFound from '../pages/NotFound.jsx';
import Login from '../pages/Login/Login.jsx';
import Home from '../pages/Home/Home.jsx';
import Dashboard from '../pages/Home/Dashboard/Dashboard.jsx';
import Inventory from '../pages/Home/Inventory/Inventory.jsx';
import Lendings from '../pages/Home/Lendings/Lendings.jsx';
import Personas from '../pages/Home/Personas/Personas.jsx';
import UsersManagement from '../pages/Home/UsersManagement/UsersManagement.jsx';
import Reports from '../pages/Home/Reports/Reports.jsx';

export const router = createBrowserRouter([
	{ path: '/login', element: <Login />, errorElement: <NotFound /> },
	{
		path: '/home',
		element: <Home />,
		errorElement: <NotFound />,
		children: [
			{
				path: '',
				element: <Navigate to='dashboard' replace />,
			},
			{
				path: 'dashboard',
				element: <Dashboard />,
			},
			{ path: 'inventory', element: <Inventory /> },
			{ path: 'lendings', element: <Lendings /> },
			{ path: 'personas', element: <Personas /> },
			{ path: 'usersmanagement', element: <UsersManagement /> },
			{ path: 'reports', element: <Reports /> },
		],
	},
	{ errorElement: <NotFound /> },
]);
