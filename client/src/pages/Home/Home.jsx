import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext.jsx';
import { Link, Outlet } from 'react-router-dom';
import DarkLightButton from '../../components/MainPage/ButtonLightDark/DarkLightButton.jsx';

function Home() {
	const { theme } = useContext(ThemeContext);
	return (
		<div data-theme={theme}>
			<Link to='/home/dashboard'>Dashboard</Link>
			<div></div>
			<Link to='/home/bb'>BB</Link>
			<Outlet />
		</div>
	);
}

export default Home;
