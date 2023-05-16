import './PersonasTableRow.css';
import { useEffect, useState } from 'react';
import UpdateReq from '../../../../../apis/UpdateReq';

import OnEditButtons from '../../Buttons/OnEditButtons/OnEditButtons';
import SelectComponent from '../../Select/SelectComponent';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

function PersonasTableRow({ data, keepExpand }) {
	//Guarda los estados de las variables representadas en los componentes
	//Saves the states for the variables rendered in the components
	const [expand, setExpand] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [rowData, setRowData] = useState(data);
	const [edited, setEdited] = useState(false);

	//Maneja la función de edición de los campos relevantes
	//Handles the edit function to the relevant fields
	function handleEditData(e, field) {
		setRowData((prev) => (prev = { ...rowData, [field]: e.target.value }));
		setEdited(true);
	}

	useEffect(() => {
		console.log(rowData);
	}, [rowData]);

	//Maneja la solicitud de API para actualizar el registro en la base de datos
	//Handles the api request to update the record in the database
	const handleUpdateReq = async () => {
		console.log(edited);
		if (!edited) {
			setEdited(false);
			return;
		}
		const resData = await UpdateReq('/api/personas/updatePersona', rowData);
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
	}

	//Maneja la funcionalidad de expandir la tarjeta de información
	//Handles the expand functionality of the row
	function handleExpand() {
		setExpand(!expand);
	}

	const borrower_type_Options = [
		{ value: 'Estudiante', label: 'Estudiante' },
		{ value: 'Docente', label: 'Docente' },
		{ value: 'Administrativo', label: 'Administrativo' },
		{ value: 'Externo', label: 'Externo' },
	];

	return (
		<div
			className='Persona TableRow'
			onMouseLeave={() => {
				setExpand(false);
			}}
		>
			<div className='ShowedInfo Personas'>
				<div className='HeaderPersonaCard'>
					<div className='PersonaInfo'>
						<h3>{rowData.borrower_fullname}</h3>
						<div>{rowData.borrower_career}</div>
					</div>

					<div className='PersonaMoreInfo'>
						<p>
							{rowData.borrower_type == 'Estudiante' && `Número de control:`}
							{rowData.borrower_type == 'Docente' && `Número de empleado:`}
							{rowData.borrower_type == 'Administrativo' &&
								`Número de empleado:`}
							{rowData.borrower_type == 'Externo' && `ID:`}{' '}
							{rowData.borrower_id}
						</p>
						{/* <h5>{rowData.borrower_type}</h5> */}
						<SelectComponent
							options={borrower_type_Options}
							defaultSelected={rowData.borrower_type}
							handler={(field, value) => {
								handleEditData(field, value);
							}}
							field={'borrower_type'}
							disable={!isEditing}
						/>
					</div>
				</div>
			</div>

			<div
				className={`Personas Expandible ${
					keepExpand || expand || isEditing ? 'Show' : ''
				}`}
			>
				<div>
					<h3>Notas</h3>
					<p
						contentEditable={isEditing}
						onBlur={(e) => handleEditData('lending_remarks', e)}
						suppressContentEditableWarning
					></p>
					<p>
						{rowData.lendings.length > 0 &&
							`Prestamos pendientes: ${rowData.lendings.length}`}
					</p>
				</div>
				<div className='InteractiveButtons Lendings'>
					<OnEditButtons
						handleUpdateReq={handleUpdateReq}
						handleEditField={(value) => {
							setIsEditing(value);
						}}
						isEditing={isEditing}
						cancelEdit={handleCancelEdit}
					/>
				</div>
			</div>

			<div
				className={`ExpandBar ${
					keepExpand || expand || isEditing ? '' : 'Show'
				}`}
				onClick={handleExpand}
			>
				<FontAwesomeIcon icon={faCaretDown} />
			</div>
		</div>
	);
}

export default PersonasTableRow;
