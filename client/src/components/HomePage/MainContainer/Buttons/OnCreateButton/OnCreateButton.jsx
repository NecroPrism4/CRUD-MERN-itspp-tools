import './OnCreateButton.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

function OnCreateButton({ handler }) {
	return (
		<button className='OnCreateButton' onClickCapture={handler}>
			<span className='icon'>
				<FontAwesomeIcon icon={faPlus} />{' '}
			</span>
			<span className='text'>Nuevo</span>
		</button>
	);
}

export default OnCreateButton;
