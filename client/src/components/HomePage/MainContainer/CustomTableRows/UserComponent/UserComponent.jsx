import './UserComponent.css';
import { useEffect, useState } from 'react';
import OnEditButtons from '../../Buttons/OnEditButtons/OnEditButtons';
import SelectComponent from '../../Select/SelectComponent';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCaretDown,
	faHashtag,
	faPaperPlane,
} from '@fortawesome/free-solid-svg-icons';

function UserComponent({ data, labNameDistincts, userTypeDistincts }) {
	const [expand, setExpand] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [rowData, setRowData] = useState(data);
	const [lab, setLab] = useState(data.lab.lab_name);

	//Maneja la función de edición de los campos relevantes
	//Handles the edit function to the relevant fields
	function handleEditData(field, e) {
		setRowData((prev) => (prev = { ...rowData, [field]: e.target.value }));
	}

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

	/* 	const labOptions = [
		{ value: 'Redes', label: 'Redes' },
		{ value: 'Programación', label: 'Programación' },
		{ value: 'Cómputo', label: 'Cómputo' },
		{ value: 'Civil', label: 'Civil' },
		{ value: 'Industrial', label: 'Industrial' },
	]; */

	return (
		<div
			className='UserCard TableRow'
			onMouseLeave={() => {
				setExpand(false);
			}}
		>
			<div className='CardHeader'>
				<img
					className='UserPhoto'
					src='https://static.wikia.nocookie.net/marveldatabase/images/c/c8/Wanda_Maximoff_%28Earth-199999%29_from_Doctor_Strange_in_the_Multiverse_of_Madness_Promo_001.jpg'
					alt='user'
				/>
				<div className='UserNameArea'>
					<div>
						<h4>{rowData.user_fullname}</h4>

						<p className='Email'>
							<span>
								<FontAwesomeIcon icon={faPaperPlane} />
							</span>{' '}
							{rowData.user_email}
						</p>
						<p className='EmpNumb'>
							<span>
								<FontAwesomeIcon icon={faHashtag} />
							</span>{' '}
							Numero de empleado: {rowData.user_id}
						</p>
					</div>
				</div>
			</div>
			<div className='CardBody'>
				<div>
					<p>Rol: </p>
					<SelectComponent
						options={userTypeDistincts && userTypeDistincts}
						handler={''}
						disable={!isEditing}
						defaultSelected={rowData.user_type}
						handleEditData={handleEditData}
						field={'user_type'}
					/>
				</div>
				<div>
					<p>lab: </p>
					<SelectComponent
						options={labNameDistincts && labNameDistincts}
						handler={''}
						disable={!isEditing}
						defaultSelected={rowData.lab_id}
						handleEditData={handleEditData}
						field={'lab_id'}
					/>
				</div>
			</div>

			<div className='EditButtons'>
				<OnEditButtons
					handleEditField={(value) => {
						setIsEditing(value);
					}}
					isEditing={isEditing}
					cancelEdit={handleCancelEdit}
				/>
			</div>
			<div className={`WeekBitacora ${expand ? 'Expand' : ''}`}>
				<h4>Bitácora reciente</h4>
				<div>Prestamo hecho a hace 3 hora</div>
				<div>Prestamo hecho a hace 3 hora</div>
				<div>Prestamo hecho a hace 3 hora</div>
				<div>Prestamo hecho a hace 3 hora</div>
				<div>Prestamo hecho a hace 3 hora</div>
			</div>
			<div
				className={`ExpandBar ${expand || isEditing ? '' : 'Show'}`}
				onClick={handleExpand}
			>
				<FontAwesomeIcon icon={faCaretDown} />
			</div>
		</div>
	);
}

export default UserComponent;
