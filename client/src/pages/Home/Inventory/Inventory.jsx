import './Inventory.css';
import usePopulateTable from '../../../hooks/usePopulateTable.jsx';
import { useEffect, useContext, useState } from 'react';
import { SectionContext } from '../../../context/SectionContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

const api = `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/api/inventory/get`;

function Inventory() {
	const { handleTitle } = useContext(SectionContext);
	const [query, SetQuery] = useState('');
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

	useEffect(() => {
		handleTitle('Inventario');
	}, []);

	/* useEffect(() => {
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
				setTableData(data);
			})
			.catch((error) => {
				console.error('Error fetching data: ', error);
			});
	}, []); */

	return (
		<div className='HomeChildContainer'>
			<h2>Materiales</h2>
			<div className='tableContainer'>
				<table className='table '>
					<thead>
						<tr>
							<th>
								<div className='tableDivAction'>Acción</div>
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
						{tableData.map((object) => (
							<tr key={object.item_id}>
								<td data-label='Acción'>
									<button>
										<FontAwesomeIcon icon={faEdit} />
									</button>
								</td>
								<td data-label='ID'>{object.item}</td>
								<td data-label='Material'>{object.item_type}</td>
								<td data-label='Marca'>{object.item_brand}</td>
								<td data-label='Modelo'>{object.item_model}</td>
								<td data-label='Descripción'>{object.item_description}</td>
								<td data-label='Disponible'>{object.item_available}</td>
								<td data-label='Notas'>{object.item_remarks}</td>
								<td data-label='Laboratorio'>{object.item_lab_id}</td>
							</tr>
						))}
					</tbody> */}
				</table>
			</div>
		</div>
	);
}

export default Inventory;
