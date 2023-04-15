import './TextboxLogin.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function TextboxLogin(props) {
	return (
		<div className='cardInputsContainer'>
			{props.icon && (
				<FontAwesomeIcon className='faIconsLogin' icon={props.icon} />
			)}
			<input
				className='cardInputs'
				type={props.type}
				name={props.name}
				id={props.id}
				placeholder={props.placeholder}
			></input>
		</div>
	);
}

export default TextboxLogin;
