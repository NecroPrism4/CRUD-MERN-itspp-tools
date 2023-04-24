import './Personas.css';
import { useEffect, useContext } from 'react';

import { SectionContext } from '../../../context/SectionContext';

function Personas() {
	const { handleTitle } = useContext(SectionContext);


	useEffect(() => {
		handleTitle('Personas');
	}, []);

	useEffect();

	return (
		<div className='HomeChildContainer'>
			<h2>Personas</h2>

		</div>
	);
}

export default Personas;
