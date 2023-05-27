import { createBrowserRouter, Navigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute.jsx';
import AdminRoute from './AdminRoutes.jsx';

import NotFound from '../pages/NotFound/NotFound.jsx';
import NonAthorized from '../pages/NonAuthorized/NonAthorized.jsx';
import Login from '../pages/Login/Login.jsx';
import Home from '../pages/Home/Home.jsx';
import Dashboard from '../pages/Home/Dashboard/Dashboard.jsx';
import Inventory from '../pages/Home/Inventory/Inventory.jsx';
import Lendings from '../pages/Home/Lendings/Lendings.jsx';
import Personas from '../pages/Home/Personas/Personas.jsx';
import UsersManagement from '../pages/Home/UsersManagement/UsersManagement.jsx';
import Reports from '../pages/Home/Reports/Reports.jsx';
import ProfilePage from '../pages/Home/ProfilePage/ProfilePage.jsx';

export const router = createBrowserRouter([
	{
		path: '/nonAuthorized',
		element: <PrivateRoute element={NonAthorized} elementName={'NonAuth'} />,
	},
	{
		path: '/',
		element: <Navigate to='/login' replace />,
	},
	{
		path: '/login',
		element: <PrivateRoute element={Login} elementName={'Login'} />,
		errorElement: <NotFound />,
	},
	{
		path: '/home',
		element: <PrivateRoute element={Home} elementName={'Home'} />,
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
			{ path: 'lendings/:id', element: <Lendings /> },
			{ path: 'personas', element: <Personas /> },
			{ path: 'personas/:items', element: <Personas /> },
			{
				path: 'usersmanagement',
				element: <AdminRoute element={UsersManagement} />,
			},
			{ path: 'reports', element: <Reports /> },
			{ path: 'profile', element: <ProfilePage /> },
		],
	},
	{ errorElement: <NotFound /> },
]);
