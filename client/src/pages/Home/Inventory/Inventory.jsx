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
	const [query, setQuery] = useState('');
	const [queryOption, setQueryOption] = useState('item_type');
	const [queryRoute, SetQueryroute] = useState('/api/inventory/get');
	const [method, SetMethod] = useState('get');
	const [pageNumber, setPagenumber] = useState(1);

	const { loading, error, tableData, hasMore } = usePopulateTable(
		query,
		queryOption,
		queryRoute,
		method,
		pageNumber
	);

	const lastElementRef = useInfinitScrolling(loading, hasMore, setPagenumber);

	function handleQueryOption(e) {
		setQueryOption(e.target.value);
		setPagenumber(1);
	}

	function handleSearch(e) {
		setQuery(e.target.value);
		setPagenumber(1);
	}

	const queryOptions = [
		{ value: 'item_type', label: 'Nombre' },
		{ value: 'item_brand', label: 'ID' },
		{ value: 'item_model', label: 'ID' },
		{ value: 'item_description', label: 'ID' },
		{ value: 'item_available', label: 'ID' },
		{ value: 'item_notes', label: 'ID' },
	];

	return (
		<div className='HomeChildContainer'>
			<div className='tableHeader'>
				<h2>Materiales</h2>
				<div>
					<p>Buscar por</p>
					<SelectComponent
						options={queryOptions}
						onChange={handleQueryOption}
					/>
					<input
						placeholder='Buscar...'
						type='text'
						className='tableSearchBar'
						onChange={handleSearch}
					></input>
				</div>
			</div>
			<div className='tableContainer'>
				<table className='table'>
					<thead>
						<tr>
							<th>
								<div className='tableDivAction '>Acción</div>
							</th>
							<th>
								<div>ID</div>
							</th>
							<th>
								<div>Material</div>
							</th>
							<th>
								<div>Marca</div>
							</th>
							<th>
								<div>Modelo</div>
							</th>
							<th>
								<div>Descripción</div>
							</th>
							<th>
								<div>Disponible</div>
							</th>
							<th>
								<div>Notas</div>
							</th>
							<th>
								<div>Laboratorio</div>
							</th>
						</tr>
					</thead>
					{/* <tbody>
						{tableData.map((object) => {
							if (tableData.length === tableData.lastIndexOf(object) + 1) {
								return (
									<tr key={object.item_id} ref={lastElementRef}>
										<td data-label='Acción'>
											<button>
												<FontAwesomeIcon icon={faEdit} />
											</button>
										</td>
										<td data-label='ID'>{object.item_id}</td>
										<td data-label='Material'>{object.item_type}</td>
										<td data-label='Marca'>{object.item_brand}</td>
										<td data-label='Modelo'>{object.item_model}</td>
										<td data-label='Descripción'>{object.item_description}</td>
										<td data-label='Disponible'>{object.item_available}</td>
										<td data-label='Notas'>{object.item_remarks}</td>
										<td data-label='Laboratorio'>{object.item_lab_id}</td>
									</tr>
								);
							} else {
								return (
									<tr key={object.item_id}>
										<td data-label='Acción'>
											<button>
												<FontAwesomeIcon icon={faEdit} />
											</button>
										</td>
										<td data-label='ID'>{object.item_id}</td>
										<td data-label='Material'>{object.item_type}</td>
										<td data-label='Marca'>{object.item_brand}</td>
										<td data-label='Modelo'>{object.item_model}</td>
										<td data-label='Descripción'>{object.item_description}</td>
										<td data-label='Disponible'>{object.item_available}</td>
										<td data-label='Notas'>{object.item_remarks}</td>
										<td data-label='Laboratorio'>{object.item_lab_id}</td>
									</tr>
								);
							}
						})}
					</tbody> */}
				</table>

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
