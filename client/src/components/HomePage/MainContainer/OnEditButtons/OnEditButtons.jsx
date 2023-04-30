import './OnEditButtons.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

function OnEditButtons() {
	const [isEditing, setIsEditing] = useState(false);

	function handleEdit() {
		setIsEditing(true);
	}

	function handleAcceptEdit() {
		setIsEditing(false);
	}

	function handleCancelEdit() {
		setTimeout(() => {
			setIsEditing(false);
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
