import { ThemeContextProvider } from './context/ThemeContext';
import '../src/Style.css';
import Login from './pages/Login/Login.jsx';
import Home from '../src/pages/Home/Home.jsx';
import Nopage from '../src/pages/Nopage.jsx';

import { Route, Routes } from 'react-router-dom';

function App() {
	return (
		<ThemeContextProvider>
			<div>
				<Routes>
					<Route path='/login' Component={Login} />
					<Route exact path='/home' Component={Home} />
					<Route path='*' Component={Nopage} />
				</Routes>
			</div>
		</ThemeContextProvider>
	);
}

export default App;
