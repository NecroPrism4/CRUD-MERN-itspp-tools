import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext.jsx';
import { Link, Outlet } from 'react-router-dom';

import SideMenu from '../../components/HomePage/Sidemenu/SideMenu.jsx';

function Home() {
	const { theme } = useContext(ThemeContext);
	return (
		<>
			<div className='HomePrimaryContainer' data-theme={theme}>
				<SideMenu></SideMenu>
				<div className='HomeMainContainer'>
					<Outlet />
				</div>
				<div className='HomeRighSideContainer'></div>
			</div>
		</>
	);
}

export default Home;
