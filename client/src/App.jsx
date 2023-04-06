import { useState } from 'react';
import Login from '/src/pages/Login.jsx';
import Home from '/src/pages/Home.jsx';
import { ThemeContextProvider } from './context/ThemeContext';

import { Route, Routes } from 'react-router-dom';

function App() {
	return (
		<ThemeContextProvider>
			<Routes>
				<Route path='/login' Component={Login} />
				<Route exact path='/home' Component={Home} />
			</Routes>
		</ThemeContextProvider>
	);
}

export default App;
