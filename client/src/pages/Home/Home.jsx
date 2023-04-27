import './Home.css';
import { useContext, useRef } from 'react';
import { ThemeContext } from '../../context/ThemeContext.jsx';

import { Outlet } from 'react-router-dom';
import LogoSideMenu from '../../components/HomePage/Sidemenu/LogoSideMenu/LogoSideMenu.jsx';
import SideMenu from '../../components/HomePage/Sidemenu/SideMenu.jsx';
import UpperNav from '../../components/HomePage/MainContainer/UpperNav/UpperNav.jsx';

function Home() {
	const { theme } = useContext(ThemeContext);

	const upperNavRef = useRef(null);

	return (
		<>
			<div className='HomePrimaryContainer' data-theme={theme}>
				<aside className='SideMenuContainer'>
					<LogoSideMenu />

					<SideMenu></SideMenu>
				</aside>
				<div className='HomeMainContainer'>
					<UpperNav ref={upperNavRef} />
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
