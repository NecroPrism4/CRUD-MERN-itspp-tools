import { useContext, useState } from 'react';
import { ThemeContext } from '../../context/ThemeContext.jsx';
import { Link, Outlet } from 'react-router-dom';
import { faBars, faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Home.css';
import LogoSideMenu from '../../components/HomePage/Sidemenu/LogoSideMenu/LogoSideMenu.jsx';
import SideMenu from '../../components/HomePage/Sidemenu/SideMenu.jsx';
import DarkLightButton from '../../components/HomePage/ButtonLightDark/DarkLightButton.jsx';

function Home() {
	const { theme } = useContext(ThemeContext);

	return (
		<>
			<div className='HomePrimaryContainer' data-theme={theme}>
				<aside className='SideMenuContainer'>
					<LogoSideMenu />
					<SideMenu></SideMenu>
				</aside>
				<div className='HomeMainContainer'>
					<nav className='UpperNav'>
						<div className='ShowMenu'>
							<FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
						</div>
						<div className='NavRightSide'>
							<h2></h2>
							<DarkLightButton />
							<FontAwesomeIcon icon={faCaretLeft} className='ShowRight' />
						</div>
					</nav>
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
