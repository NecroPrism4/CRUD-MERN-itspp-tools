import './UsersManagement.css';
import { useEffect, useContext } from 'react';

import { SectionContext } from '../../../context/SectionContext';

const api = `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/api/users/get`;

function UsersManagement() {
	const { handleTitle } = useContext(SectionContext);

	useEffect(() => {
		handleTitle('Manejo de usuarios');
	}, []);

	useEffect(() => {
		console.log(api);
		fetch(api)
			.then((response) => {
				if (response.ok) {
					console.log('response ok');
					return response.json();
				}
				throw response;
			})
			.then((data) => {
				console.log(data);
				//setTableTitle(data);
			})
			.catch((error) => {
				console.error('Error fetching data: ', error);
			});
	}, []);

	return (
		<div>
			<h2 className='HomeChildContainer'>Manejo de usuarios</h2>
		</div>
	);
}

export default UsersManagement;
