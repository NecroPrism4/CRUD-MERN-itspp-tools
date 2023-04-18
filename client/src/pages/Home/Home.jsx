import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext.jsx';
import { Link, Outlet } from 'react-router-dom';
import DarkLightButton from '../../components/MainPage/ButtonLightDark/DarkLightButton.jsx';

function Home() {
	const { theme } = useContext(ThemeContext);
	return (
		<>
			<div className='HomePrimaryContainer' data-theme={theme}>
				<div className='HomeLeftSideContainer'></div>
				<div className='HomeMainContainer'></div>
				<div className='HomeRighSideContainer'></div>
			</div>
		</>
	);
}

export default Home;
