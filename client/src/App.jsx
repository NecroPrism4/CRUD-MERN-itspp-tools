import { ThemeContextProvider } from './context/ThemeContext';
import '../src/Style.css';
import Login from './pages/Login/Login.jsx';
import Home from '../src/pages/Home/Home.jsx';
import Nopage from '../src/pages/Nopage.jsx';

import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Home/Dashboard/Dashboard';
import bb from './pages/Home/Dashboard/bb';

function App() {
	return (
		<ThemeContextProvider>
			<div>
				<Routes>
					<Route path='/login' Component={Login} />
					<Route path='/home' Component={Home} exact>
						<Route path='dashboard' Component={Dashboard} />
						<Route path='bb' Component={bb} />
					</Route>
					<Route path='*' Component={Nopage} />
				</Routes>
			</div>
		</ThemeContextProvider>
	);
}

export default App;
