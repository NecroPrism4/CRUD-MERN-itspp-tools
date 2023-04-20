import React from 'react';
import { Link } from 'react-router-dom';
import './ButtonMenu.css';

function ButtonMenu(props) {
	return (
		<>
			<Link to={props.route}>
				<i className='menuButtonIcon' />
				<div className='menuButtonText'>{props.title}</div>
			</Link>
		</>
	);
}

export default ButtonMenu;
