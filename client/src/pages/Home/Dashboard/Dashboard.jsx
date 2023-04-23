import './Dashboard.css';
import { useEffect, useContext } from 'react';

import { SectionContext } from '../../../context/SectionContext';

function Dashboard() {
	const { handleTitle } = useContext(SectionContext);

	useEffect(() => {
		handleTitle('Dashboard');
	}, []);

	return (
		<div className='HomeChildContainer'>
			<h2>Dashboard</h2>
		</div>
	);
}

export default Dashboard;
