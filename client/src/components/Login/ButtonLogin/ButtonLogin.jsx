import './ButtonLogin.css';

function ButtonLogin(props) {
	return (
		<input type='submit' value={props.value} className='btnLogin cardInputs' />
	);
}

export default ButtonLogin;
