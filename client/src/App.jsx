import { ThemeContextProvider } from './context/ThemeContext';
import '../src/Style.css';
import Login from '../src/pages/Login.jsx';
import Home from '../src/pages/Home.jsx';

import { Route, Routes } from 'react-router-dom';

function App() {
	return (
		<ThemeContextProvider>
			<div>
				<Routes>
					<Route path='/login' Component={Login} />
					<Route exact path='/home' Component={Home} />
					<Route path='*' Component={'Nothing  here'} />
				</Routes>
			</div>
		</ThemeContextProvider>
	);
}

export default App;
