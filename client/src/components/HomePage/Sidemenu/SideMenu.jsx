import React from 'react';
import './SideMenu.css';

import {
	faBoxOpen,
	faClipboardList,
	faHandHolding,
	faHouse,
} from '@fortawesome/free-solid-svg-icons';

import ButtonMenu from './SideMenuButton/ButtonMenu.jsx';

function SideMenu(props) {
	return (
		<div className='menuVertical'>
			<ul className=''>
				<li className='menuHeader'>
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
						route='tools'
						title='Materiales'
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
				{/* 
			user.admin === true && (
				<li className='menuHeader'>
					<span>Usuarios</span>
				</li>
				<li className='menuItem'>Manejo de usuarios</li>
			)
			
			*/}
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
			<div className='menuUserSection'>
				<div>
					<img
						src='https://static.wikia.nocookie.net/marveldatabase/images/c/c8/Wanda_Maximoff_%28Earth-199999%29_from_Doctor_Strange_in_the_Multiverse_of_Madness_Promo_001.jpg'
						alt='user'
					/>
					<p>NombreUsuario</p>
					<span>Puesto Usaurio </span>
				</div>
			</div>
		</div>
	);
}

export default SideMenu;
