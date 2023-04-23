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
		<div className='HomeChildContainer table-responsive'>
			<h2>{tableTitle}</h2>
			<table className='table '>
				<thead>
					<tr>
						<th>item_id</th>
						<th>item_type</th>
						<th>item_brand</th>
						<th>item_model</th>
						<th>item_description</th>
						<th>item_available</th>
						<th>item_remarks</th>
						<th>item_lab_id</th>
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
	);
}

export default Inventory;
