import '../src/Style.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/Router';

import { ThemeContextProvider } from './context/ThemeContext';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<ThemeContextProvider>
			<RouterProvider router={router} />
		</ThemeContextProvider>
	</React.StrictMode>
);
