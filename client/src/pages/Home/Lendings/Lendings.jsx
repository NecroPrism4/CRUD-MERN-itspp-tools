import './Lendings.css';
import { useEffect, useContext, useState } from 'react';

import { SectionContext } from '../../../context/SectionContext';

function Lendings() {
	const { handleTitle } = useContext(SectionContext);

	useEffect(() => {
		handleTitle('Prestamos');
	}, []);

	const [tableTitle, setTableTitle] = useState('Vigentes');

	return (
		<div className='HomeChildContainer'>
			<h2>Prestamos {tableTitle}</h2>
		</div>
	);
}

export default Lendings;
