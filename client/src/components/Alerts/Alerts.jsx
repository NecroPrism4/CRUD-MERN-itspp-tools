import './Alerts.css';
import 'sweetalert2/dist/sweetalert2.min.css';
import Swal from 'sweetalert2';
import { currentTheme } from '../../context/ThemeContext';

export function ModalAlert(icon, title, toast) {
	Swal.fire({
		position: 'top-end',
		icon: icon,
		title: title,
		toast: toast,
		showConfirmButton: false,
		timer: 1500,

		didOpen: () => {
			const container = Swal.getContainer();
			container.setAttribute('data-theme', `${currentTheme}`);
			console.log(container);
		},

		customClass: {
			container: 'SwalContainer ',
			popup: 'SwalPopup',
			header: 'SwalHeader',
			title: 'SwalTitle',
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
}
