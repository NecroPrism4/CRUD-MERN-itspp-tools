import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './OnCreateButton.css';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

function OnCreateButton() {
	return (
		<button className='OnCreateButton'>
			<span className='icon'>
				<FontAwesomeIcon icon={faPlus} />{' '}
			</span>
			<span className='text'>Nuevo</span>
		</button>
	);
}

export default OnCreateButton;
