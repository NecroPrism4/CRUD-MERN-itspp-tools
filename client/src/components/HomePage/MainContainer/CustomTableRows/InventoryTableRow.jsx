import './InventoryTableRow.css';
import { useState } from 'react';
import OnEditButtons from '../Buttons/OnEditButtons.jsx';

function InventoryTableRow({ data }) {
	const [itemName, setItemName] = useState(data.item_type);
	const [isEditable, setIsEditable] = useState(false);
	const [editedData, setEditedData] = useState(data);

	function handleEditData(field, e) {
		console.log(editedData);
		console.log({ ...editedData, [field]: e.target.textContent });
	}
	useState(() => {}, []);
	function handleCancelEdit() {
		setItemName(data.item_type);
	}

	return (
		<div className='TableRow'>
			<div className='ShowedInfo'>
				<div>
					<h4>ID: {editedData.item_id}</h4>
					<h3
						contentEditable={isEditable}
						onInput={(e) => handleEditData('item_brand', e)}
						suppressContentEditableWarning
					>
						{itemName}
					</h3>
				</div>
				<div className='BrandModel'>
					<div>
						<h4>Marca: </h4>
						<p
							contentEditable={isEditable}
							onInput={(e) => handleEditData('item_brand', e)}
							suppressContentEditableWarning
						>
							{editedData.item_brand}
						</p>
					</div>
					<div>
						<h4>Modelo: </h4>
						<p>{editedData.item_model}</p>
					</div>
				</div>
				<h3
					className='itemAvailable'
					style={{ color: editedData.item_available ? '#00c69f' : '#e56552' }}
					data-tooltip={editedData.item_available ? '' : 'Revise notas..'}
				>
					{editedData.item_available ? 'Disponible' : 'No Disponible'}
				</h3>
			</div>
			<div className='Expandible'>
				<div>
					<h3>Descripción</h3>
					<p>
						Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla,
						cumque.
					</p>
				</div>
				<div>
					<h3>Notas</h3>
					<p>Estas son algunas notas del utensilio</p>
				</div>
				<div className='returnedNotes'>
					{editedData.lendings[0] &&
						`En posesión de:  ${editedData.lendings[0].borrower.borrower_name} ${editedData.lendings[0].borrower.borrower_lastname} (${editedData.lendings[0].borrower.borrower_jobposition})`}
				</div>
				<OnEditButtons
					handleEditField={(value) => {
						setIsEditable(value);
						console.log(value);
					}}
					isEditing={isEditable}
					cancelEdit={handleCancelEdit}
				></OnEditButtons>
			</div>
		</div>
	);
}

export default InventoryTableRow;
