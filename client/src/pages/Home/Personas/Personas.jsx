import './Personas.css';
import { useState, useEffect, useContext } from 'react';
import { SectionContext } from '../../../context/SectionContext';
import usePopulateTable from '../../../hooks/usePopulateTable';
import useInfinitScrolling from '../../../hooks/useInfiniteScrolling.jsx';

import Error from '../../../components/HomePage/MainContainer/Error/Error.jsx';
import Loading from '../../../components/HomePage/MainContainer/Loading/Loading.jsx';
import PersonasTableRow from '../../../components/HomePage/MainContainer/CustomTableRows/PersonasTableRow/PersonasTableRow.jsx';
import TabOptionsComponent from '../../../components/HomePage/MainContainer/TabOptionsComponent/TabOptionsComponent';
import SelectComponent from '../../../components/HomePage/MainContainer/Select/SelectComponent';
import SearchBar from '../../../components/HomePage/MainContainer/SearchBar/SearchBar.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpRightAndDownLeftFromCenter } from '@fortawesome/free-solid-svg-icons';

function Personas() {
	const { handleTitle } = useContext(SectionContext);
	useEffect(() => {
		handleTitle('Personas');
		setPageNumber(1);
	}, []);

	//Variables que utiliza el hook personalizado que se encarga de pupular la tableview
	//Varibles used by the personalized hook that is in charge of pupulating the tableview
	const [keepExpand, setKeepExpand] = useState(false);
	const [validInput, setvalidInput] = useState(true);
	const [pageNumber, setPageNumber] = useState(1);
	const [userTypeQuery, setUserTypeQuery] = useState([]);
	const [queryOption, setQueryOption] = useState('borrower_id');
	const [query, setQuery] = useState('');

	//Se encarga de las solicitudes http al servidor para completar la tabla
	//Takes care of the http requests to the server to pupulate the table
	const { loading, error, tableData, hasMore } = usePopulateTable(
		'get',
		'/api/personas/get',
		pageNumber,
		userTypeQuery,
		queryOption,
		query
	);

	//se ocupa del último elemento representado en la lista, por lo que una vez que choca con la parte visible del navegador, envía una señal para enviar otra solicitud al servidor
	//Takes care of the las element rendered on the list so once it collides with the viewable part of the browser sends a signal to send another request to the server
	const lastElementRef = useInfinitScrolling(loading, hasMore, setPageNumber);

	//Maneja las funciones de busqueda
	//Handles search when te user types into the input component
	const handleSearch = (e) => {
		const value = e.target.value;
		const onlyNumbers = /^[0-9\b]+$/; // Expresión regular para aceptar solo números

		// Las siguientes declaraciones if manejan si el usuario escribe letras en lugar de números cuando intenta buscar por ID
		//The following if statements handles if the user types letters instead of numbers when tries to search by ID
		if (queryOption != 'borrower_id' || queryOption != 'borrower_semester') {
			setvalidInput(true);
			setQuery(value);
		} else if (!onlyNumbers.test(value)) {
			setvalidInput(false);
			setQuery('');
		} else {
			setQuery(value);
			setvalidInput(true);
		}

		if (value == '') {
			setvalidInput(true);
		}

		setPageNumber(1);
	};

	//Maneja la consulta a la base de datos basada en el tipo de usuario
	//Handles the query to the database based on the user_type
	const handleUserType = (e) => {
		setUserTypeQuery(['borrower_type', e.target.value]);
		setPageNumber(1);
	};

	//Maneja la opción de búsqueda (por ejemplo: buscar por ID, por nombre del prestatario, etc.)
	//Handles the search option (for example: search by ID, by BorrowerName, etc)
	const handleQueryOption = (e) => {
		setQueryOption(e.target.value);
		setPageNumber(1);
	};

	const queryOptions = [
		{ value: 'borrower_id', label: 'ID' },
		{ value: 'borrower_fullname', label: 'Nombre' },
		{ value: 'borrower_career', label: 'Carrera' },
		{ value: 'borrower_notes', label: 'Notas' },
	];

	return (
		<div className='HomeChildContainer Personas'>
			<div className='Personas TableHeader'>
				<h2>Prestatarios</h2>
				{/* <div className='Personas SearchOptions'>
					<TabOptionsComponent
						handler={handleUserType}
						api='/api/personas/getTabs'
						tabOption='borrower_type'
					/>
					<div>
						<SelectComponent
							options={queryOptions}
							handler={handleQueryOption}
						/>
						<SearchBar handler={handleSearch} validInput={validInput} />
						<button
							className={keepExpand ? `Active` : ''}
							onClick={() => {
								setKeepExpand(!keepExpand);
							}}
						>
							<FontAwesomeIcon icon={faUpRightAndDownLeftFromCenter} />
						</button>
					</div>
				</div> */}
			</div>
			<div
				className={`tableContainer ShowTableAnim ${
					tableData.length > 0 ? 'Active' : ''
				}`}
			>
				{tableData.length > 0 &&
					tableData.map((object) => {
						if (tableData.length === tableData.lastIndexOf(object) + 1) {
							return (
								<div key={object.borrower_id} ref={lastElementRef}>
									<PersonasTableRow data={object} keepExpand={keepExpand} />
								</div>
							);
						} else {
							return (
								<div key={object.borrower_id}>
									<PersonasTableRow data={object} keepExpand={keepExpand} />
								</div>
							);
						}
					})}

				<div>{loading && <Loading />}</div>
				<div>{error && <Error />}</div>
				<div>
					{!loading && !error && tableData.length < 1 && (
						<Error noResults={tableData.length < 1} />
					)}
				</div>
			</div>
		</div>
	);
}

export default Personas;
