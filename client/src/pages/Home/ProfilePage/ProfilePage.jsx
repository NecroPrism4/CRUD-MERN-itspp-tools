import './ProfilePage.css';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { UpdateReq } from '../../../apis/ApiReqests';

import { validEmail, validPassword } from '../../../helpers/regexes';
import OnEditButtons from '../../../components/HomePage/MainContainer/Buttons/OnEditButtons/OnEditButtons';
import Textbox from '../../../components/HomePage/MainContainer/Textbox/Textbox';
import { ConfirmModal } from '../../../components/Modals/ConfirmModal/ConfirmModal';
import { ModalAlert } from '../../../components/Modals/Alerts/Alerts';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

function ProfilePage() {
	const { user, dispatch } = useAuthContext();

	const [isEditing, setIsEditing] = useState(false);
	const [edited, setEdited] = useState(false);
	const [rowData, setRowData] = useState({
		...user,
		user_password: '',
		user_password2: '',
	});

	const [emailValidation, setEmailValidation] = useState(true);
	const [passwordValidation, setPasswordValidation] = useState(true);
	const [password2Validation, setPassword2Validation] = useState(true);
	const [passEdited, setPassEdited] = useState(false);

	function handleEditData(field, e) {
		if (field == 'user_password' || field == 'user_password2') {
			setPassEdited(true);
		}

		setRowData(
			//Combina el campo editado con los datos anterioress
			//Merges the edited field with the previous data
			(prev) => (prev = { ...rowData, [field]: e })
		);
		setEdited(true);
	}

	//Maneja la función de cancelación de edición en los campos relevantes, por lo que vuelve al contenido de vistas previas
	//Handles the cancel edit function to the relevant fields, so it gets back to the previews content
	function handleCancelEdit() {
		setRowData((prev) => (prev = user));
		setEdited(false);
		setPassEdited(false);
	}

	console.log(user);

	const handleUpdateReq = async () => {
		if (!edited) {
			setEdited(false);
			return;
		}

		if (
			!(
				emailValidation &&
				(!passEdited || (passwordValidation && password2Validation))
			)
		) {
			handleCancelEdit();
			if (rowData.user_password != rowData.user_password2) {
				ModalAlert('error', 'Las contraseñas no coinciden');
				return;
			} else if (!validEmail) {
				ModalAlert('error', 'Correo no válido');
				return;
			} else {
				ModalAlert('error', 'Verifica los campos');
				return;
			}
		}

		try {
			//Envía la solicitud de actualización al servidor
			//Sends the update request to the server
			const resData = await UpdateReq(
				'/api/users/normal/updateUser',
				rowData,
				user.token
			);
			console.log(resData);
			if (resData?.response?.status == 409) {
				ModalAlert('error', '¡ID duplicado!', true);
				handleCancelEdit();
				return;
			}
			if (resData?.code == 'ERR_NETWORK') {
				ModalAlert('error', '¡No se pudo conectar!', true);
				handleCancelEdit();
				return;
			}
			if (resData?.user_id) {
				resData.user_password = '';
				rowData.user_password2 = '';
				setRowData((prev) => (prev = { ...rowData, ...resData }));
				dispatch({ type: 'UPDATE_USER', payload: resData });
				ModalAlert('success', '¡Guardado!', true);
				dispatch({ type: 'UPDATE_USER', payload: resData });
			} else {
				ModalAlert('error', '¡No se pudo guardar!', true);
				handleCancelEdit();
			}
		} catch (err) {
			ModalAlert('error', '¡No se pudo guardar!', true);
			handleCancelEdit();
		}
	};

	const handleLogout = async () => {
		const confirm = await ConfirmModal(
			'warning',
			'¿Estás seguro que deseas cerrar sesión?',
			'Confirmar',
			'Cancelar'
		);

		if (confirm) {
			dispatch({ type: 'LOGOUT' });
		}
	};

	//Maneja la función de pegar texto plano en los campos editables del item
	//Handles the paste function to the editable fields of the item
	const handlePaste = (e) => {
		e.preventDefault();

		// Obtener el texto plano pegado sin formato
		// Get pasted unformatted plain text
		const plainText = e.clipboardData.getData('text/plain');
		e.target.textContent = plainText;
	};

	return (
		<div className='HomeChildContainer ProfilePage'>
			<h2>Perfil</h2>
			<div className='ProfileSection'>
				<img
					className='ProfilePicture'
					src='https://static.wikia.nocookie.net/marveldatabase/images/c/c8/Wanda_Maximoff_%28Earth-199999%29_from_Doctor_Strange_in_the_Multiverse_of_Madness_Promo_001.jpg'
					alt='Profile Picture'
				/>

				{isEditing ? (
					<div className='ProfileInfo'>
						<div className='EditFullName'>
							<Textbox
								onPaste={handlePaste}
								placeHolder={'Nombre(s)'}
								field={'user_name'}
								defaultValue={rowData.user_name}
								handler={handleEditData}
								HandleValidity={(e) => {
									return;
								}}
							/>
							<Textbox
								onPaste={handlePaste}
								placeHolder={'Apellido(s)'}
								field={'user_lastname'}
								defaultValue={rowData.user_lastname}
								handler={handleEditData}
								HandleValidity={(e) => {
									return;
								}}
							/>
						</div>

						<h5>
							<FontAwesomeIcon icon={faPaperPlane} />
							<Textbox
								onPaste={handlePaste}
								placeHolder={'Email'}
								field={'user_email'}
								defaultValue={rowData.user_email}
								handler={handleEditData}
								HandleValidity={(e) => {
									setEmailValidation(
										validEmail.test(rowData.user_email) ? true : false
									);
								}}
								validity={emailValidation}
							/>
						</h5>
						<h5>
							<FontAwesomeIcon icon={faKey} />
							<div className='EditPass'>
								<Textbox
									onPaste={handlePaste}
									type='password'
									placeHolder={'Nueva contraseña'}
									field={'user_password'}
									handler={handleEditData}
									HandleValidity={(e) => {
										setPasswordValidation(
											validPassword.test(rowData.user_password) ||
												e.target.value == ''
										);
									}}
									validity={emailValidation}
								/>
								<Textbox
									onPaste={handlePaste}
									type='password'
									placeHolder={'Cofirme contraseña'}
									field={'user_password2'}
									handler={handleEditData}
									HandleValidity={(e) => {
										setPassword2Validation(
											validPassword.test(rowData.user_password) ||
												e.target.value == ''
										);
									}}
									validity={emailValidation}
								/>
							</div>
						</h5>
						<div className='EmpNumb'>
							<h5>Numero de empleado: </h5>{' '}
							<Textbox
								onPaste={handlePaste}
								placeHolder={'ej. 12345'}
								field={'user_id'}
								defaultValue={rowData.user_id}
								handler={handleEditData}
								HandleValidity={(e) => {
									return;
								}}
							/>
						</div>
						<Textbox
							onPaste={handlePaste}
							placeHolder={'Puesto de trabajo'}
							field={'user_jobposition'}
							defaultValue={rowData.user_jobposition}
							handler={handleEditData}
							HandleValidity={(e) => {
								return;
							}}
						/>
						<p>Nivel de acceso: {rowData.user_type}</p>
					</div>
				) : (
					<div className='ProfileInfo'>
						<h3>{rowData.user_fullname}</h3>

						<h5>
							<FontAwesomeIcon icon={faPaperPlane} />
							<a href={`mailto:${rowData.user_email}`}>{rowData.user_email}</a>
						</h5>

						<div className='EmpNumb'>
							<h5>Numero de empleado: </h5> <p>{rowData.user_id}</p>
						</div>
						<p>{rowData.user_jobposition}</p>
						<p>Nivel de acceso: {rowData.user_type}</p>
					</div>
				)}
			</div>
			<OnEditButtons
				handleUpdateReq={handleUpdateReq}
				handleEditField={(value) => {
					setIsEditing(value);
				}}
				isEditing={isEditing}
				cancelEdit={handleCancelEdit}
			/>

			<div className='Bitacora'></div>

			<button className='OnCreateButton LogOut' onClick={handleLogout}>
				<span className='text'>Cerrar Sesión</span>
			</button>
		</div>
	);
}

export default ProfilePage;
