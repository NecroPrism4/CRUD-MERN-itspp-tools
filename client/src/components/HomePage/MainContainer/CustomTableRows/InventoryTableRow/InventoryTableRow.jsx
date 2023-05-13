import './InventoryTableRow.css';
import { useState } from 'react';
import OnEditButtons from '../../Buttons/OnEditButtons/OnEditButtons.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

function InventoryTableRow({ data }) {
	const [expand, setExpand] = useState(false);
	const [isEditable, setIsEditable] = useState(false);
	const [rowData, setRowData] = useState(data);

	function handleEditData(field, e) {
		setRowData(
			(prev) => (prev = { ...rowData, [field]: e.target.textContent })
		);
	}

	function handleCancelEdit() {
		setRowData((prev) => (prev = data));
	}

	function handleExpand() {
		setExpand(!expand);
	}

	return (
		<div
			className='TableRow Expand'
			onMouseLeave={() => {
				setExpand(false);
			}}
			onClick={handleExpand}
		>
			<div className='ShowedInfo'>
				<div>
					<p>ID: {rowData.item_id}</p>
					<h3
						contentEditable={isEditable}
						onBlur={(e) => handleEditData('item_type', e)}
						suppressContentEditableWarning
					>
						{rowData.item_type}
					</h3>
				</div>
				<div className='BrandModel'>
					<div>
						<h5>Marca: </h5>
						<p
							contentEditable={isEditable}
							onBlur={(e) => handleEditData('item_brand', e)}
							suppressContentEditableWarning
						>
							{rowData.item_brand}
						</p>
					</div>
					<div>
						<h5>Modelo: </h5>
						<p
							contentEditable={isEditable}
							onBlur={(e) => handleEditData('item_model', e)}
							suppressContentEditableWarning
						>
							{rowData.item_model}
						</p>
					</div>
				</div>
				<h4
					className='itemAvailable'
					style={{ color: rowData.item_available ? '#00c69f' : '#e56552' }}
					data-tooltip={rowData.item_available ? '' : 'Revise notas..'}
				>
					{rowData.item_available ? 'Disponible' : 'No Disponible'}
				</h4>
			</div>
			<div className={`Expandible ${expand || isEditable ? 'Show' : ''}`}>
				<div>
					<h4>Descripción</h4>
					<p
						contentEditable={isEditable}
						onBlur={(e) => handleEditData('item_description', e)}
						suppressContentEditableWarning
					>
						{rowData.item_description}
					</p>
				</div>
				<div>
					<h4>Notas</h4>
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

			<div
				className={`ExpandBar ${expand || isEditable ? '' : 'Show'}`}
				onClick={handleExpand}
			>
				<FontAwesomeIcon icon={faCaretDown} />
			</div>
		</div>
	);
}

export default InventoryTableRow;
