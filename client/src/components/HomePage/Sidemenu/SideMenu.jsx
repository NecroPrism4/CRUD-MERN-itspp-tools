import { useState } from 'react';
import './SideMenu.css';

import {
	faAngleLeft,
	faBoxOpen,
	faClipboardList,
	faHandHolding,
	faHouse,
	faUserGear,
	faUserGroup,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ButtonMenu from '../MainContainer/Buttons/SideMenuButton/ButtonMenu.jsx';

function SideMenu(props) {
	const [ShowMenu, setShowMenu] = useState(false);

	return (
		<div className='MenuandUser'>
			<button className='hideMenuButton'>
				<div className='ico'>
					<FontAwesomeIcon icon={faAngleLeft}></FontAwesomeIcon>
				</div>
			</button>
			<div className='MenuContainer'>
				<ul className='menuVertical'>
					<li className='menuHeader menuHeader1'>
						<span>Menú</span>
					</li>
					<li className='menuItem'>
						<ButtonMenu
							route='dashboard'
							title='Dashboard'
							icon={faHouse}
						></ButtonMenu>
					</li>
					<li className='menuItem'>
						<ButtonMenu
							route='inventory'
							title='Inventario'
							icon={faBoxOpen}
						></ButtonMenu>
					</li>
					<li className='menuItem'>
						<ButtonMenu
							route='lendings'
							title='Prestamos'
							icon={faHandHolding}
						></ButtonMenu>
					</li>
					<li className='menuHeader'>
						<span>Usuarios</span>
					</li>
					<li className='menuItem'>
						<ButtonMenu
							route='personas'
							title='Personas'
							icon={faUserGroup}
						></ButtonMenu>
					</li>
					{/* 
			user.admin === true && (
				<li className='menuItem'>Manejo de usuarios</li>
			)	
			*/}
					<li className='menuItem'>
						<ButtonMenu
							route='usersmanagement'
							title='Manejo de usuarios'
							icon={faUserGear}
						></ButtonMenu>
					</li>
					<li className='menuHeader'>
						<span>Otros</span>
					</li>
					<li className='menuItem'>
						<ButtonMenu
							route='reports'
							title='Reportes'
							icon={faClipboardList}
						></ButtonMenu>
					</li>
				</ul>
			</div>
			<div className='divGap'></div>
			<div className='menuUserSection'>
				<img
					src='https://static.wikia.nocookie.net/marveldatabase/images/c/c8/Wanda_Maximoff_%28Earth-199999%29_from_Doctor_Strange_in_the_Multiverse_of_Madness_Promo_001.jpg'
					alt='user'
				/>
				<div>
					<p>NombreUsuario</p>
					<span>Puesto Usuario </span>
				</div>
			</div>
		</div>
	);
}

export default SideMenu;
