import './Dashboard.css';
import { useEffect, useContext } from 'react';

import Loading from '../../../components/HomePage/MainContainer/Loading/Loading.jsx';

import { SectionContext } from '../../../context/SectionContext';

function Dashboard() {
	const { handleTitle } = useContext(SectionContext);
	handleTitle('Dashboard');

	return (
		<div className='HomeChildContainer'>
			<h1>Dashboard</h1>

			<Loading></Loading>
		</div>
	);
}

export default Dashboard;
