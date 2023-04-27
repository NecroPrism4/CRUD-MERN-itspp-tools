import './Home.css';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext.jsx';

import { Outlet } from 'react-router-dom';
import LogoSideMenu from '../../components/HomePage/Sidemenu/LogoSideMenu/LogoSideMenu.jsx';
import SideMenu from '../../components/HomePage/Sidemenu/SideMenu.jsx';
import UpperNav from '../../components/HomePage/MainContainer/UpperNav/UpperNav.jsx';

function Home() {
	const { theme } = useContext(ThemeContext);

	return (
		<>
			<div className='HomePrimaryContainer' data-theme={theme}>
				<aside className='SideMenuContainer'>
					<LogoSideMenu />
					<SideMenu />
				</aside>
				<div className='HomeMainContainer'>
					<UpperNav />
					<Outlet />
				</div>
				<div className='HomeRighSideContainer'>
					<input type='text' placeholder='Buscar' />
				</div>
			</div>
		</>
	);
}

export default Home;
