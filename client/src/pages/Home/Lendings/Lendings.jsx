import './Lendings.css';
import { useEffect, useContext, useState } from 'react';
import { SectionContext } from '../../../context/SectionContext';

function Lendings() {
	const { handleTitle } = useContext(SectionContext);

	useEffect(() => {
		handleTitle('Prestamos');
	}, []);

	const [tableTitle, setTableTitle] = useState('Vigentes');

	function handleSearch(e) {
		setQuery(e.target.value);
		setPagenumber(1);
	}

	return (
		<div className='HomeChildContainer'>
			<div className='tableHeader prestamos'>
				<h2>Prestamos {tableTitle}</h2>
				<input
					placeholder='Buscar...'
					type='text'
					className='tableSearchBar'
					onChange={handleSearch}
				></input>
			</div>
		</div>
	);
}

export default Lendings;
