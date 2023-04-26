import './Dashboard.css';
import { useEffect, useContext } from 'react';

import LoadingError from '../../../components/HomePage/MainContainer/LoadingError/LoadingError';

import { SectionContext } from '../../../context/SectionContext';

function Dashboard() {
	const { handleTitle } = useContext(SectionContext);

	useEffect(() => {
		handleTitle('Dashboard');
	}, []);

	return (
		<div className='HomeChildContainer'>
			<h2>Dashboard</h2>

			<LoadingError></LoadingError>
		</div>
	);
}

export default Dashboard;
