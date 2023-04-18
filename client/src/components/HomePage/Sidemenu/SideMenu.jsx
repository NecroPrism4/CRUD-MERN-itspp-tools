import React from 'react';
import './SideMenu.css';

function SideMenu() {
	return (
		<aside className='SideMenuContainer'>
			<aside
				id='layout-menu'
				className='layout-menu menu-vertical menu bg-menu-theme'
			>
				<div className='app-brand demo'>
					<a href='home/dashboard' className='app-brand-link'>
						<span className='app-brand-logo demo'>
							<img width='25' viewBox='0 0 25 42' />
						</span>
						<span className='app-brand-text menu-text fw-bolder ms-2 '></span>
					</a>
					<a className='layout-menu-toggle menu-link text-large ms-auto'>
						<i className='bx bx-chevron-left bx-sm align-middle'></i>
					</a>
				</div>
				<div className='menu-inner-shadow'></div>
				<ul className='menu-inner py-1'>
					<li className='menu-item'>
						<a href='home/dashboard' className='menu-link'>
							<i className='menu-icon tf-icons bx bx-home-circle'></i>
							<div data-i18n='Analytics'>Dashboard</div>
						</a>
					</li>
					<li className='menu-item'>
						<a href='/servers' className='menu-link'>
							<i className='menu-icon tf-icons bx bx-server'></i>
							<div data-i18n='Layouts'>Servers</div>
						</a>
					</li>
					<li className='menu-item'>
						<a href='/create' className='menu-link'>
							<i className='menu-icon tf-icons bx bx-plus-medical'></i>
							<div data-i18n='Layouts'>Create a Server</div>
						</a>
					</li>
					<li className='menu-header small text-uppercase'>
						<span className='menu-header-text'>Pages</span>
					</li>
					<li className='menu-item'>
						<a href='/gift' className='menu-link'>
							<i className='menu-icon tf-icons bx bx-gift'></i>
							<div data-i18n='Layouts'>Gift</div>
						</a>
					</li>

					<li className='menu-item'>
						<a href='/status' className='menu-link'>
							<i className='menu-icon tf-icons bx bx-stats'></i>
							<div data-i18n='Layouts'>Status</div>
						</a>
					</li>

					<li className='menu-item'>
						<a href='/redeem' className='menu-link'>
							<i className='menu-icon tf-icons bx bx-book-reader'></i>
							<div data-i18n='Layouts'>Redeem</div>
						</a>
					</li>
					<li className='menu-item'>
						<a href='/j4r' className='menu-link'>
							<i className='menu-icon tf-icons bx bx-diamond'></i>
							<div data-i18n='Layouts'>Join for Reward</div>
						</a>
					</li>
					<li className='menu-item'>
						<a href='/lv' className='menu-link'>
							<i className='menu-icon tf-icons bx bx-link-external'></i>
							<div data-i18n='Layouts'>Linkvertise Earning</div>
						</a>
					</li>
					<li className='menu-header small text-uppercase'>
						<span className='menu-header-text'>Store</span>
					</li>
					<li className='menu-item'>
						<a href='/store' className='menu-link'>
							<i className='menu-icon tf-icons bx bx-store'></i>
							<div data-i18n='Layouts'>Store</div>
						</a>
					</li>
					<li className='menu-item'>
						<a href='/buy' className='menu-link'>
							<i className='menu-icon tf-icons bx bx-cart'></i>
							<div data-i18n='Layouts'>Buy Coins</div>
						</a>
					</li>
				</ul>
			</aside>
		</aside>
	);
}

export default SideMenu;
