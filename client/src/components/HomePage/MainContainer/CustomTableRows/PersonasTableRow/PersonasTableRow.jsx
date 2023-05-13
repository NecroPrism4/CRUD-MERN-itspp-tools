import './PersonasTableRow.css';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import OnEditButtons from '../../Buttons/OnEditButtons/OnEditButtons';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

function PersonasTableRow({ data, keepExpand }) {
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
			className=' Persona TableRow Expand'
			onMouseLeave={() => {
				setExpand(false);
			}}
			onClick={handleExpand}
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
						<h5>{rowData.borrower_type}</h5>
					</div>
				</div>
			</div>

			<div
				className={`Personas Expandible ${
					keepExpand || expand || isEditable ? 'Show' : ''
				}`}
			>
				<div>
					<h3>Notas</h3>
					<p
						contentEditable={isEditable}
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
						handleEditField={(value) => {
							setIsEditable(value);
						}}
						isEditing={isEditable}
						cancelEdit={handleCancelEdit}
					/>
				</div>
			</div>

			<div
				className={`ExpandBar ${
					keepExpand || expand || isEditable ? '' : 'Show'
				}`}
				onClick={handleExpand}
			>
				<FontAwesomeIcon icon={faCaretDown} />
			</div>
		</div>
	);
}

export default PersonasTableRow;
