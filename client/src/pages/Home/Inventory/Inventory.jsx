import './Inventory.css';
import { useEffect, useContext, useState } from 'react';
import { SectionContext } from '../../../context/SectionContext';

function Inventory() {
	const { handleTitle } = useContext(SectionContext);

	useEffect(() => {
		handleTitle('Inventario');
	}, []);

	const [tableTitle, setTableTitle] = useState('Materiales');

	return (
		<div className='HomeChildContainer'>
			<h2>{tableTitle}</h2>
			<div className='tableContainer'>
				<table className='table '>
					<thead>
						<tr>
							<th>
								<div>item_id</div>
							</th>
							<th>
								<div>item_type</div>
							</th>
							<th>
								<div>item_brand</div>
							</th>
							<th>
								<div>item_model</div>
							</th>
							<th>
								<div>item_description</div>
							</th>
							<th>
								<div>item_available</div>
							</th>
							<th>
								<div>item_remarks</div>
							</th>
							<th>
								<div>item_lab_id</div>
							</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>1</td>
							<td>...</td>
							<td>...</td>
							<td>...</td>
							<td>...</td>
							<td>true</td>
							<td>...</td>
							<td>1</td>
						</tr>
						<tr>
							<td>2</td>
							<td>...</td>
							<td>...</td>
							<td>...</td>
							<td>...</td>
							<td>false</td>
							<td>...</td>
							<td>1</td>
						</tr>
						<tr>
							<td>3</td>
							<td>...</td>
							<td>...</td>
							<td>...</td>
							<td>...</td>
							<td>true</td>
							<td>...</td>
							<td>2</td>
						</tr>
						<tr>
							<td>4</td>
							<td>...</td>
							<td>...</td>
							<td>...</td>
							<td>...</td>
							<td>true</td>
							<td>...</td>
							<td>2</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default Inventory;
