import './OnEditButtons.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

function OnEditButtons({ handleEditField, isEditing, cancelEdit }) {
	function handleEdit() {
		handleEditField(true);
	}

	function handleAcceptEdit() {
		handleEditField(false);
	}

	function handleCancelEdit() {
		setTimeout(() => {
			handleEditField(false);
			cancelEdit();
		}, 150);
	}
	return (
		<div className='EditButtons'>
			{isEditing ? (
				<>
					<button onClick={handleAcceptEdit}>Aceptar</button>
					<button onClick={handleCancelEdit}>Cancelar</button>
				</>
			) : (
				<button onClick={handleEdit}>
					<FontAwesomeIcon icon={faEdit} />
					Editar
				</button>
			)}
		</div>
	);
}

export default OnEditButtons;
