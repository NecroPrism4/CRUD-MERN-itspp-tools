import '../FormDialogs/FormDialogs.css';
import 'sweetalert2/dist/sweetalert2.min.css';
import Swal from 'sweetalert2';

function getTheme() {
	return localStorage.getItem('theme');
}

export async function ConfirmModal(icon, title) {
	const confirm = await Swal.fire({
		icon: icon,
		title: title,
		toast: false,
		timer: false,
		showConfirmButton: true,
		showCancelButton: true,
		confirmButtonText: 'Confirmar',
		cancelButtonText: 'Cancelar',
		allowOutsideClick: false,
		allowEscapeKey: false,

		didOpen: () => {
			const currentTheme = getTheme();
			const container = Swal.getContainer();
			container.setAttribute('data-theme', `${currentTheme}`);
		},

		customClass: {
			container: 'SwalContainer ',
			popup: 'SwalPopup',
			header: 'SwalHeader',
			title: 'SwalTitle',
			confirmButton: 'SwalConfirmButton',
			closeButton: 'SwalCloseButton',

			/* closeButton: '...', */
			icon: 'SwalIcon',
			image: 'SwalImage',
			/* htmlContainer: '...',
			input: '...',
			inputLabel: '...',
			validationMessage: '...',
			actions: '...',
			confirmButton: '...',
			denyButton: '...',
			cancelButton: '...',
			loader: '...',
			footer: '....',
			timerProgressBar: '....', */
		},
	});
	return confirm;
}
