import './Personas.css';
import { useEffect, useContext } from 'react';
import { SectionContext } from '../../../context/SectionContext';

import Error from '../../../components/HomePage/MainContainer/Error/Error.jsx';
import Loading from '../../../components/HomePage/MainContainer/Loading/Loading.jsx';
import PersonasTableRow from '../../../components/HomePage/MainContainer/CustomTableRows/PersonasTableRow/PersonasTableRow.jsx';

function Personas() {
	const { handleTitle } = useContext(SectionContext);

	useEffect(() => {
		handleTitle('Personas');
	}, []);

	return (
		<div className='HomeChildContainer'>
			<h2>Personas</h2>
			<PersonasTableRow />
			<Error />
			<Loading />
		</div>
	);
}

export default Personas;
