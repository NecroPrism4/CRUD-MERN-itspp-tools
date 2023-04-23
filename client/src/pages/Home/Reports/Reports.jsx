import './Reports.css';
import { useEffect, useContext } from 'react';

import { SectionContext } from '../../../context/SectionContext';

function Reports() {
	const { handleTitle } = useContext(SectionContext);

	useEffect(() => {
		handleTitle('Reportes');
	}, []);

	return (
		<div className='HomeChildContainer'>
			<h2>Reports</h2>
		</div>
	);
}

export default Reports;
