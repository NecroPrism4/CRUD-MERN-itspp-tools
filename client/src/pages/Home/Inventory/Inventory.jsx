import './Inventory.css';
import usePopulateTable from '../../../hooks/usePopulateTable.jsx';
import useInfinitScrolling from '../../../hooks/useInfiniteScrolling.jsx';
import { SectionContext } from '../../../context/SectionContext';
import { useEffect, useContext, useState, useRef, useCallback } from 'react';

import Loading from '../../../components/HomePage/MainContainer/Loading/Loading.jsx';
import InventoryTableRow from '../../../components/HomePage/MainContainer/InventoryTableRow/InventoryTableRow.jsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import Error from '../../../components/HomePage/MainContainer/Error/Error';
import SelectComponent from '../../../components/HomePage/MainContainer/Select/SelectComponent';

function Inventory() {
	useEffect(() => {
		handleTitle('Inventario');
	}, []);

	const { handleTitle } = useContext(SectionContext);
	const [queryRoute, SetQueryroute] = useState('/api/inventory/get');
	const [method, SetMethod] = useState('get');
	const [pageNumber, setPagenumber] = useState(1);
	const [isAvailable, setIsAvailable] = useState('');
	const [queryOption, setQueryOption] = useState('item_type');
	const [query, setQuery] = useState('');

	const { loading, error, tableData, hasMore } = usePopulateTable(
		queryRoute,
		method,
		pageNumber,
		isAvailable,
		queryOption,
		query
	);

	const lastElementRef = useInfinitScrolling(loading, hasMore, setPagenumber);

	const handleAvailability = (e) => {
		setIsAvailable(e.target.value);
		setPagenumber(1);
	};

	const handleQueryOption = (e) => {
		setQueryOption(e.target.value);
		setPagenumber(1);
	};

	function handleSearch(e) {
		setQuery(e.target.value);
		setPagenumber(1);
	}

	const queryOptions = [
		{ value: 'item_type', label: 'Nombre' },
		{ value: 'item_brand', label: 'Marca' },
		{ value: 'item_model', label: 'Modelo' },
		{ value: 'item_description', label: 'Descripción' },
		{ value: 'item_notes', label: 'notas' },
	];

	const availabityOptions = [
		{ value: '', label: 'Todos' },
		{ value: 'true', label: 'Disponibles' },
		{ value: 'false', label: 'No Disponibles' },
	];

	return (
		<div className='HomeChildContainer'>
			<div className='tableHeader'>
				<h1>Materiales</h1>
				<div>
					<p>Buscar por</p>
					<SelectComponent
						options={availabityOptions}
						handler={handleAvailability}
					/>
					<SelectComponent options={queryOptions} handler={handleQueryOption} />
					<input
						placeholder='Buscar...'
						type='text'
						className='tableSearchBar'
						onChange={handleSearch}
					></input>
				</div>
			</div>
			<div className='tableContainer'>
				{tableData.map((object) => {
					if (tableData.length === tableData.lastIndexOf(object) + 1) {
						return (
							<div key={object.item_id} ref={lastElementRef}>
								<InventoryTableRow data={object} />
							</div>
						);
					} else {
						return <InventoryTableRow key={object.item_id} data={object} />;
					}
				})}

				<div>{loading && <Loading />}</div>
				<div>{error && <Error />}</div>
			</div>
		</div>
	);
}

export default Inventory;
