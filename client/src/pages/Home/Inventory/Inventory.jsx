import './Inventory.css';
import usePopulateTable from '../../../hooks/usePopulateTable.jsx';
import { SectionContext } from '../../../context/SectionContext';
import { useEffect, useContext, useState, useRef, useCallback } from 'react';

import LoadingError from '../../../components/HomePage/MainContainer/LoadingError/LoadingError.jsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

function Inventory() {
	const { handleTitle } = useContext(SectionContext);
	const [query, setQuery] = useState('');
	const [identifier, setIdentifier] = useState('item_id');
	const [queryRoute, SetQueryroute] = useState('/api/inventory/get');
	const [method, SetMethod] = useState('get');
	const [pageNumber, setPagenumber] = useState(1);

	const { loading, error, tableData, hasMore } = usePopulateTable(
		query,
		identifier,
		queryRoute,
		method,
		pageNumber
	);

	const observer = useRef();
	const lastElementRef = useCallback(
		loading
			? null
			: (node) => {
					console.log(observer.current);
					if (observer.current) observer.current.disconnect();
					observer.current = new IntersectionObserver((entries) => {
						if (entries[0].isIntersecting && hasMore) {
							setPagenumber((prevPageNumber) => prevPageNumber + 1);
						}
					});
					if (node) observer.current.observe(node);
					console.log(node);
			  }
	);

	function handleSearch(e) {
		setQuery(e.target.value);
		setPagenumber(1);
	}

	useEffect(() => {
		handleTitle('Inventario');
	}, []);

	return (
		<div className='HomeChildContainer'>
			<div className='tableHeader'>
				<h2>Materiales</h2>
				<input
					type='text'
					className='tableSearchBar'
					onChange={handleSearch}
				></input>
			</div>
			<div className='tableContainer'>
				<table className='table '>
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
					<tbody>
						{tableData.map((object) => {
							console.log(tableData.lastIndexOf(object));
							console.log(tableData.length);
							if (tableData.length === tableData.lastIndexOf(object) + 1) {
								return (
									<tr key={object[identifier]} ref={lastElementRef}>
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
									<tr key={object[identifier]}>
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
					</tbody>
				</table>
				<div>{loading && <LoadingError />}</div>
			</div>
		</div>
	);
}

export default Inventory;
