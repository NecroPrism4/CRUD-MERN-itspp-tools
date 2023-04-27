import './Dashboard.css';
import { useEffect, useContext } from 'react';

import Loading from '../../../components/HomePage/MainContainer/Loading/Loading.jsx';

import { SectionContext } from '../../../context/SectionContext';

function Dashboard() {
	const { handleTitle } = useContext(SectionContext);

	useEffect(() => {
		handleTitle('Dashboard');
	}, []);

	return (
		<div className='HomeChildContainer'>
			<h2>Dashboard</h2>

			<Loading></Loading>
		</div>
	);
}

export default Dashboard;
