import './InventoryTableRow.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import UpdateReq from '../../../../../apis/UpdateReq';
import OnEditButtons from '../../Buttons/OnEditButtons/OnEditButtons.jsx';

import { ModalAlert } from '../../../../Alerts/Alerts';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

function InventoryTableRow({ data }) {
	//Guarda los estados de las variables representadas en los componentes
	//Saves the states for the variables rendered in the components
	const [expand, setExpand] = useState(false);
	const [isEditable, setIsEditable] = useState(false);
	const [rowData, setRowData] = useState(data);
	const [edited, setEdited] = useState(false);

	//Maneja la función de edición de los campos relevantes
	//Handles the edit function to the relevant fields
	function handleEditData(field, e) {
		setRowData(
			//Combina el campo editado con los datos anterioress
			//Merges the edited field with the previous data
			(prev) => (prev = { ...rowData, [field]: e.target.textContent })
		);
		setEdited(true);
	}

	/* useEffect(() => {
		console.log(rowData);
	}, [rowData]); */
	//Maneja la solicitud de API para actualizar el registro en la base de datos
	//Handles the api request to update the record in the database
	const handleUpdateReq = async () => {
		if (!edited) {
			setEdited(false);
			return;
		}
		const resData = await UpdateReq('/api/inventory/updateItem', rowData);
		if (resData) {
			setRowData((prev) => (prev = { ...rowData, ...resData }));
			ModalAlert('success', '¡Guardado!', true);
		} else {
			ModalAlert('error', '¡No se pudo guardar!', true);
		}
	};

	//Maneja la función de cancelación de edición en los campos relevantes, por lo que vuelve al contenido de vistas previas
	//Handles the cancel edit function to the relevant fields, so it gets back to the previews content
	function handleCancelEdit() {
		setRowData((prev) => (prev = data));
		setEdited(false);
	}

	//Maneja la funcionalidad de expandir la tarjeta de información
	//Handles the expand functionality of the row
	function handleExpand() {
		setExpand(!expand);
	}

	return (
		<div
			className='TableRow Expand'
			onMouseLeave={() => {
				setExpand(false);
			}}
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
							<button>
								<Link
									to={`../lendings/${rowData.lendings[0].lendings.lending_id}`}
								>
									Ver Prestamo
								</Link>
							</button>
						</div>
					)}
					<OnEditButtons
						handleUpdateReq={handleUpdateReq}
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
