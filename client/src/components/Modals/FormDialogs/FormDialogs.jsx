import './FormDialogs.css';
import Swal from 'sweetalert2';
import { ItemForm, ItemFields } from './HtmlForms';

function getTheme() {
	return localStorage.getItem('theme');
}

export function FormDialog() {
	Swal.fire({
		title: 'HELOOOOO',
		html: ItemForm,
		didOpen: () => {
			const currentTheme = getTheme();
			const container = Swal.getContainer();
			container.setAttribute('data-theme', `${currentTheme}`);
		},

		/* preConfirm: () => {
			const formData = {};

			ItemFields.map((element) => {
				formData[element[0]] = document.getElementById(element[0]).value;
			});
			console.log(formData);
			return formData;
		},
 */
		customClass: {
			container: 'SwalContainer ',
			popup: 'SwalPopup',
			header: 'SwalHeader',
			title: 'SwalTitle',
			/* closeButton: '...', */
			icon: 'SwalIcon',
			image: 'SwalImage',
			input: 'SwalInput',
			htmlContainer: 'SwalHtmlContainer',
			/* 
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
