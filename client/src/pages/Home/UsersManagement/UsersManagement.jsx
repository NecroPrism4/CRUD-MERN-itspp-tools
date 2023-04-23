import './UsersManagement.css';
import { useEffect, useContext } from 'react';

import { SectionContext } from '../../../context/SectionContext';

function UsersManagement() {
	const { handleTitle } = useContext(SectionContext);

	useEffect(() => {
		handleTitle('Manejo de usuarios');
	}, []);

	return (
		<div>
			<h2 className='HomeChildContainer'>Manejo de usuarios</h2>
		</div>
	);
}

export default UsersManagement;
