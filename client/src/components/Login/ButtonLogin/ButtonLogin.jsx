import './ButtonLogin.css';
import { Link } from 'react-router-dom';

function ButtonLogin(props) {
	return (
		<input type='submit' value={props.value} className='btnLogin cardInputs' />
	);
}

export default ButtonLogin;
