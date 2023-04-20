import React from 'react';
import { Link } from 'react-router-dom';
import './ButtonMenu.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function ButtonMenu(props) {
	return (
		<>
			<Link to={props.route}>
				<i className='menuButtonIcon'>
					<FontAwesomeIcon icon={props.icon} />
				</i>
				<div className='menuButtonText'>{props.title}</div>
			</Link>
		</>
	);
}

export default ButtonMenu;
