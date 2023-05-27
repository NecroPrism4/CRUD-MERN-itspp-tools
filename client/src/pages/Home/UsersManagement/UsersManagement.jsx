import './UsersManagement.css';
import { useEffect, useContext, useState, useMemo } from 'react';
import { SectionContext } from '../../../context/SectionContext';
import usePopulateTable from '../../../hooks/usePopulateTable';
import useInfinitScrolling from '../../../hooks/useInfiniteScrolling';
import useGetDistincts from '../../../hooks/useGetDistincts';

import Error from '../../../components/HomePage/MainContainer/Error/Error';
import Loading from '../../../components/HomePage/MainContainer/Loading/Loading';
import UserComponent from '../../../components/HomePage/MainContainer/CustomTableRows/UserComponent/UserComponent';

function UsersManagement() {
	const { handleTitle } = useContext(SectionContext);
	useEffect(() => {
		handleTitle('Manejo de usuarios');
		setPageNumber(1);
	}, []);

	//Variables que utiliza el hook personalizado que se encarga de pupular la tableview
	//Varibles used by the personalized hook that is in charge of pupulating the tableview
	const [pageNumber, setPageNumber] = useState(1);
	const [conditional, setConditional] = useState('user_type');
	const [queryOption, setQueryOption] = useState('user_name');
	const [query, setQuery] = useState('');

	//Se encarga de las solicitudes http al servidor para completar la tabla
	//Takes care of the http requests to the server to pupulate the table
	const { loading, error, tableData, hasMore } = usePopulateTable(
		'get',
		'/api/users/get',
		pageNumber,
		'',
		queryOption,
		query
	);

	//se ocupa del último elemento representado en la lista, por lo que una vez que choca con la parte visible del navegador, envía una señal para enviar otra solicitud al servidor
	//Takes care of the las element rendered on the list so once it collides with the viewable part of the browser sends a signal to send another request to the server
	const lastElementRef = useInfinitScrolling(loading, hasMore, setPageNumber);

	//Maneja las funciones de busqueda
	//Handles search when te user types into the input component
	const handleSearch = (e) => {
		setQuery(e.target.value);
		setPageNumber(1);
	};

	//Maneja la opción de búsqueda (por ejemplo: buscar por ID, por nombre del usuario, etc.)
	//Handles the search option (for example: search by ID, by UserName, etc)
	const handleQueryOption = (e) => {
		setQueryOption(e.target.value);
		setPageNumber(1);
	};

	const { distincts: labNameDistincts } = useGetDistincts(
		'/api/labs/get',
		'lab_id',
		'lab_name'
	);

	const { distincts: userTypeDistincts } = useGetDistincts(
		'/api/users/getUserTypes',
		'user_type',
		'user_type'
	);

	return (
		<div className='HomeChildContainer UsersManagement'>
			<div className='Users TableHeader'>{/* <h1>Table Header</h1> */}</div>
			<div
				className={`Users tableContainer ShowTableAnim ${
					tableData.length > 0 ? 'Active' : ''
				}`}
			>
				{tableData.map((user) => {
					if (tableData.length === tableData.lastIndexOf(user) + 1) {
						return (
							<div key={user.user_id} ref={lastElementRef} className='RefDiv'>
								<UserComponent
									key={user.user_id}
									data={user}
									labNameDistincts={labNameDistincts}
									userTypeDistincts={userTypeDistincts}
								/>
							</div>
						);
					} else {
						return (
							<UserComponent
								key={user.user_id}
								data={user}
								labNameDistincts={labNameDistincts}
								userTypeDistincts={userTypeDistincts}
							/>
						);
					}
				})}
			</div>

			<div>{loading && <Loading />}</div>
			<div>{error && <Error />}</div>
			<div>
				{!loading && !error && tableData.length < 1 && (
					<Error noResults={tableData.length < 1} />
				)}
			</div>
		</div>
	);
}

export default UsersManagement;
