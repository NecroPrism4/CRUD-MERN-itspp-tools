import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext.jsx';
import { Link, Outlet } from 'react-router-dom';
import {
	faArrowLeft,
	faBars,
	faThLarge,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import LogoSideMenu from '../../components/HomePage/Sidemenu/LogoSideMenu/LogoSideMenu.jsx';
import SideMenu from '../../components/HomePage/Sidemenu/SideMenu.jsx';
import DarkLightButton from '../../components/HomePage/ButtonLightDark/DarkLightButton.jsx';

function Home() {
	const { theme } = useContext(ThemeContext);
	return (
		<>
			<div className='HomePrimaryContainer' data-theme={theme}>
				<aside className='SideMenu'>
					<div className='DivLogo'>
						<LogoSideMenu />
					</div>
					<SideMenu></SideMenu>
				</aside>
				<div className='HomeMainContainer'>
					<nav>
						<div className='ShowMenu'>
							<FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
						</div>
						<div className='NavRightSide'>
							<h2></h2>
							<DarkLightButton />
							<FontAwesomeIcon icon={faArrowLeft} />
							<FontAwesomeIcon icon={faThLarge} />
						</div>
					</nav>
					<Outlet />
				</div>
				<div className='HomeRighSideContainer'></div>
			</div>
		</>
	);
}

export default Home;
