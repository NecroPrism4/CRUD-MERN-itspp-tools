import './InventoryTableRow.css';
import { useEffect, useState } from 'react';
import OnEditButtons from '../../Buttons/OnEditButtons/OnEditButtons.jsx';

function InventoryTableRow({ data }) {
	const [isEditable, setIsEditable] = useState(false);
	const [rowData, setRowData] = useState(data);
	const [actualBorrower, setActualBorrower] = useState();

	function handleEditData(field, e) {
		setRowData(
			(prev) => (prev = { ...rowData, [field]: e.target.textContent })
		);
	}

	function handleCancelEdit() {
		setRowData((prev) => (prev = data));
	}

	useEffect(() => {
		console.log(rowData);
	}, []);

	return (
		<div className='TableRow Expand'>
			<div className='ShowedInfo'>
				<div>
					<h4>ID: {rowData.item_id}</h4>
					<h2
						contentEditable={isEditable}
						onBlur={(e) => handleEditData('item_type', e)}
						suppressContentEditableWarning
					>
						{rowData.item_type}
					</h2>
				</div>
				<div className='BrandModel'>
					<div>
						<h4>Marca: </h4>
						<p
							contentEditable={isEditable}
							onBlur={(e) => handleEditData('item_brand', e)}
							suppressContentEditableWarning
						>
							{rowData.item_brand}
						</p>
					</div>
					<div>
						<h4>Modelo: </h4>
						<p
							contentEditable={isEditable}
							onBlur={(e) => handleEditData('item_model', e)}
							suppressContentEditableWarning
						>
							{rowData.item_model}
						</p>
					</div>
				</div>
				<h3
					className='itemAvailable'
					style={{ color: rowData.item_available ? '#00c69f' : '#e56552' }}
					data-tooltip={rowData.item_available ? '' : 'Revise notas..'}
				>
					{rowData.item_available ? 'Disponible' : 'No Disponible'}
				</h3>
			</div>
			<div className='Expandible'>
				<div>
					<h3>Descripción</h3>
					<p
						contentEditable={isEditable}
						onBlur={(e) => handleEditData('item_description', e)}
						suppressContentEditableWarning
					>
						{rowData.item_description}
					</p>
				</div>
				<div>
					<h3>Notas</h3>
					<p
						contentEditable={isEditable}
						onBlur={(e) => handleEditData('item_remarks', e)}
						suppressContentEditableWarning
					>
						{rowData.item_remarks}
					</p>
				</div>
				<div className='returnedNotes'>
					{rowData.lendings[0] && (
						<div>
							<span>En posesión de: </span>
							{rowData.lendings[0].lendings.borrower.borrower_name}{' '}
							{rowData.lendings[0].lendings.borrower.borrower_lastname}
							<span>{` (${rowData.lendings[0].lendings.borrower.borrower_type})`}</span>
						</div>
					)}
				</div>
				<div className='InteractiveButtons'>
					{rowData.lendings[0] && (
						<div className='EditButtons Lendings'>
							<button>Ver Prestamo</button>
						</div>
					)}
					<OnEditButtons
						handleEditField={(value) => {
							setIsEditable(value);
						}}
						isEditing={isEditable}
						cancelEdit={handleCancelEdit}
					></OnEditButtons>
				</div>
			</div>
		</div>
	);
}

export default InventoryTableRow;