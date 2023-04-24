import './Inventory.css';
import { useEffect, useContext, useState } from 'react';
import { SectionContext } from '../../../context/SectionContext';

const api = `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/api/users/get`;

function Inventory() {
	const { handleTitle } = useContext(SectionContext);
	const [tableTitle, setTableTitle] = useState('Materiales');
	const [tableData, setTableData] = useState([]);

	/*const { data, isLoading, error } = useFetchGet(
		`${process.env.REACT_APP_API_BASE_URL}/api/inventory`
	);*/

	/*isLoading && <div className='loading'>Loading...</div>;*/

	useEffect(() => {
		handleTitle('Inventario');
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
				setTableData(data);
				//setTableTitle(data);
			})
			.catch((error) => {
				console.error('Error fetching data: ', error);
			});
	}, []);

	return (
		<div className='HomeChildContainer'>
			<h2>{tableTitle}</h2>
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
					<tbody>
						{/* tr*5>td[data-label='Acción']+td[data-label='Material']+td[data-label='Marca']+td[data-label='Modelo']+td[data-label='Descripción']+td[data-label='Disponible']+td[data-label='Notas']+td[data-label='Laboratorio'] */}
						{/* {tableData.map((object) => {
							<tr key={object.}></tr>
						})}; */}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default Inventory;
