import React from 'react';
import './RegisterUserForm.css';
import ButtonLogin from '../ButtonLogin/ButtonLogin.jsx';
import TextboxLogin from '../TextboxLogin/TextboxLogin.jsx';
import { faPaperPlane, faKey } from '@fortawesome/free-solid-svg-icons';

function RegisterUserForm(props) {
	return (
		<>
			<form className='FormRegister' action='' method='post'>
				<TextboxLogin
					type='text'
					name=''
					id='usertxt'
					placeholder='Nombre(s)'
				/>
				<TextboxLogin
					type='text'
					name=''
					id='usertxt2'
					placeholder='Apellido(s)'
				/>
				<TextboxLogin
					type='email'
					name=''
					id='useremail'
					placeholder='Email'
					icon={faPaperPlane}
				/>
				<TextboxLogin
					type='password'
					name=''
					id='userpassword'
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

export default RegisterUserForm;
