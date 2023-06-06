import './LoginUserForm.css';
import { useState } from 'react';
import { handleRegisterToBitacora } from '../../../apis/RecordToBitacora';
import useLogin from '../../../hooks/Auth/useLogin';

import { getNavigatorInfo } from '../../../utils/getUserInfo';
import { ModalAlert } from '../../Modals/Alerts/Alerts';
import ButtonLogin from '../ButtonLogin/ButtonLogin.jsx';
import TextboxLogin from '../TextboxLogin/TextboxLogin.jsx';

import { faPaperPlane, faKey } from '@fortawesome/free-solid-svg-icons';

function LoginUserForm(props) {
	const [userData, setUserData] = useState({
		user_email: '',
		user_password: '',
	});

	const { login, isLoading } = useLogin();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!(userData.user_email != '' && userData.user_password != '')) {
			ModalAlert('error', 'Verifica los campos');
			return;
		}

		const response = await login(userData);

		if (response?.code === 'ERR_NETWORK') {
			ModalAlert('error', 'No hay conexión con el servidor', false, 2500);
			return;
		}
		if (
			response?.response?.status === 401 ||
			response?.response?.status === 500
		) {
			ModalAlert('error', response?.response?.data, false, 2500);
			return;
		}
		ModalAlert('success', 'Iniciando sesión');

		await handleRegisterToBitacora(
			'/api/bitacora/create',
			{
				history_type: 'Inició sesión',
				history_description: 'Ingresó al sistema desde: ' + getNavigatorInfo(),
				user_id: response.data.user_id,
			},
			response.data.token
		);
	};

	return (
		<form className='FormLogin' action='' method='get' onSubmit={handleSubmit}>
			<TextboxLogin
				type='email'
				name='Email'
				id='loginUserEmail'
				placeholder='Email'
				icon={faPaperPlane}
				handler={(e) =>
					setUserData({ ...userData, user_email: e.target.value })
				}
			/>
			<TextboxLogin
				type='password'
				name='Password'
				id='loginUserPassword'
				placeholder='Contraseña'
				icon={faKey}
				handler={(e) => {
					setUserData({ ...userData, user_password: e.target.value });
				}}
			/>
			<ButtonLogin
				className='btnRegister cardInputs'
				value={props.btnValue}
				disabled={isLoading}
			/>
		</form>
	);
}

export default LoginUserForm;
