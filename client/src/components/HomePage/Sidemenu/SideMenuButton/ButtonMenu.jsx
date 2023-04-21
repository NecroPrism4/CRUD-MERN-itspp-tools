import React from 'react';
import { Link } from 'react-router-dom';
import './ButtonMenu.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function ButtonMenu(props) {
	return (
		<>
			<Link to={props.route}>
				<div className='MenuButton'>
					<i className='menuButtonIcon'>
						<FontAwesomeIcon icon={props.icon} />
					</i>
					<div className='menuButtonText'>{props.title}</div>
				</div>
			</Link>
		</>
	);
}

export default ButtonMenu;
