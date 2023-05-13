import './Lendings.css';
import { useEffect, useContext, useState } from 'react';

import { SectionContext } from '../../../context/SectionContext';
import usePopulateTable from '../../../hooks/usePopulateTable.jsx';
import useInfinitScrolling from '../../../hooks/useInfiniteScrolling.jsx';
import useCountResults from '../../../hooks/useCountResults';

import Error from '../../../components/HomePage/MainContainer/Error/Error';
import Loading from '../../../components/HomePage/MainContainer/Loading/Loading';
import LendingsTableRow from '../../../components/HomePage/MainContainer/CustomTableRows/LendingsTableRow/LendingsTableRow';
import SelectComponent from '../../../components/HomePage/MainContainer/Select/SelectComponent';
import CustomDateRangePicker from '../../../components/HomePage/MainContainer/CustomDatePicker/CustomDateRangePicker.jsx';
import SearchBar from '../../../components/HomePage/MainContainer/SearchBar/SearchBar';

function Lendings() {
	//Maneja el título de la barra de navegación superior
	//Handles the title for the upper navbar
	const { handleTitle } = useContext(SectionContext);
	useEffect(() => {
		handleTitle('Prestamos');
		setPageNumber(1);
	}, []);

	//Variables que utiliza el hook personalizado que se encarga de pupular la tableview
	//Varibles used by the personalized hook that is in charge of pupulating the tableview
	const [validInput, setvalidInput] = useState(true);
	const [pageNumber, setPageNumber] = useState(1);
	const [isActive, setIsActive] = useState('false');
	const [queryOption, setQueryOption] = useState('lending_id');
	const [query, setQuery] = useState('');
	const [datesToFilter, setDatesToFilter] = useState([]);

	//Obtiene la cantidad de resultados posibles
	//Gets the amount of results posible
	const {
		loading: countLoading,
		error: countError,
		countData: countData,
	} = useCountResults(
		'/api/lendings/getCount',
		isActive,
		queryOption,
		query,
		datesToFilter
	);

	//Se encarga de las solicitudes http al servidor para completar la tabla
	//Takes care of the http requests to the server to pupulate the table
	const { loading, error, tableData, hasMore } = usePopulateTable(
		'get',
		'/api/lendings/get',
		pageNumber,
		isActive,
		queryOption,
		query,
		datesToFilter
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
		if (queryOption != 'lending_id') {
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

	//Maneja la opción de búsqueda (por ejemplo: buscar por ID, por nombre del prestatario, etc.)
	//Handles the search option (for example: search by ID, by BorrowerName, etc)
	const handleQueryOption = (e) => {
		setQueryOption(e.target.value);
		setPageNumber(1);
	};

	//Maneja los rangos de fechas seccionados
	//Handles the range of dates selected
	const handleDateRanges = (e) => {
		setDatesToFilter(e);
		setPageNumber(1);
	};

	//Maneja los préstamos activos e inactivos, para que el usuario pueda elegir qué lista quiere ver
	//Handles the active and inactive lendings, so the user can choose which list wants to see
	const handleTabActive = (value) => {
		setIsActive(value);
		setPageNumber(1);
	};

	//Arreglo de opciones que alimenta al componente de selección #SelectComponent
	//Array of options that feed the #SelectComponent
	const queryOptions = [
		{ value: 'lending_id', label: 'ID' },
		{ value: 'borrower_name', label: 'Prestatario' },
		{ value: 'user_name', label: 'Prestador' },
		{ value: 'lending_remarks', label: 'Notas' },
	];

	return (
		<div className='HomeChildContainer'>
			<div className='tableHeader Lendings'>
				<div className='TabOptions'>
					<h2
						className={isActive == 'false' ? 'active' : ''}
						onClick={() => handleTabActive('false')}
					>
						Activos
					</h2>
					<h2
						className={isActive == 'true' ? 'active' : ''}
						onClick={() => handleTabActive('true')}
					>
						Inactivos
					</h2>
				</div>
				<div className='SearchOptions'>
					<div>
						<p>
							{!countError && !countLoading && countData
								? `${countData} resultado(s)`
								: `					`}
						</p>
					</div>
					<div>
						<CustomDateRangePicker handleRange={handleDateRanges} />
						<SelectComponent
							options={queryOptions}
							handler={handleQueryOption}
						/>
						<SearchBar handler={handleSearch} validInput={validInput} />
					</div>
				</div>
			</div>
			<div className='tableContainer'>
				<div
					className={`LendingsRows ActiveLendingsRows ${
						isActive == 'true' && tableData.length > 0 ? 'Active' : ''
					}`}
				>
					{tableData.map((object) => {
						if (tableData.length === tableData.lastIndexOf(object) + 1) {
							return (
								<div key={object.lending_id} ref={lastElementRef}>
									<LendingsTableRow data={object} />
								</div>
							);
						} else {
							return <LendingsTableRow key={object.lending_id} data={object} />;
						}
					})}
				</div>

				<div
					className={`LendingsRows ReturnedLendingsRows ${
						isActive == 'false' && tableData.length > 0 ? 'Active' : ''
					}`}
				>
					{tableData.map((object) => {
						if (tableData.length === tableData.lastIndexOf(object) + 1) {
							return (
								<div key={object.lending_id} ref={lastElementRef}>
									<LendingsTableRow data={object} />
								</div>
							);
						} else {
							return <LendingsTableRow key={object.lending_id} data={object} />;
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
		</div>
	);
}

export default Lendings;
