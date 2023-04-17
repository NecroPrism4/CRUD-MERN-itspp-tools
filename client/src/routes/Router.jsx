import { createBrowserRouter } from 'react-router-dom';

import Login from '../pages/Login/Login.jsx';

export const router = createBrowserRouter([{ path: '/', element: <Login /> }]);
