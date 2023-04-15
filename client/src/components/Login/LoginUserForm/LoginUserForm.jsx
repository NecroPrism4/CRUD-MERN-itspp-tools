import './LoginUserForm.css';
import ButtonLogin from '../ButtonLogin/ButtonLogin.jsx';
import TextboxLogin from '../TextboxLogin/TextboxLogin.jsx';
import { faPaperPlane, faKey } from '@fortawesome/free-solid-svg-icons';

function LoginUserForm(props) {
	return (
		<>
			<form className='FormLogin' action='' method='get'>
				<TextboxLogin
					type='email'
					name=''
					id='loginUserEmail'
					placeholder='Email'
					icon={faPaperPlane}
				/>
				<TextboxLogin
					type='password'
					name=''
					id='loginUserPassword'
					placeholder='Contraseña'
					icon={faKey}
				/>
				<ButtonLogin
					className='btnRegister cardInputs'
					value={props.btnValue}
				></ButtonLogin>
			</form>
		</>
	);
}

export default LoginUserForm;
