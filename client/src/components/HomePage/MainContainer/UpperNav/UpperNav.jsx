import './UpperNav.css';
import { useContext } from 'react';
import { ThemeContext } from '../../../../context/ThemeContext.jsx';
import { SectionContext } from '../../../../context/SectionContext.jsx';

import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { faBars, faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function UpperNav() {
	const { title } = useContext(SectionContext);
	const { theme, handleTheme } = useContext(ThemeContext);

	return (
		<>
			<nav className='UpperNav'>
				<div className='ShowMenu'>
					<FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
				</div>
				<h2>{title}</h2>
				<div className='NavRightSide'>
					<button className='toggle-button themeicon' onClick={handleTheme}>
						<FontAwesomeIcon
							className='theme-toggle-icon'
							icon={theme == 'light' ? faSun : faMoon}
						/>
					</button>
					<button
						className='toggle-button'
						onClick={() => {
							alert('Showright');
						}}
					>
						<FontAwesomeIcon icon={faCaretLeft} className='ShowRight' />
					</button>
				</div>
			</nav>
		</>
	);
}

export default UpperNav;
