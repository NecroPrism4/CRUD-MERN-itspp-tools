export const ItemFields = [
	['item_type', 'Nombre'],
	['item_brand', 'Marca'],
	['item_model', 'Modelo'],
	['item_description', 'Descripción'],
	['item_available', true],
	['item_remarks', 'Notas'],
	['item_lab_id', ''],
];

export const ItemForm = ItemFields.map((element) => {
	return `<input id="${element[0]}" class="swal2-input" placeholder="${element[1]}"`;
});

/* '<input id="name" class="swal2-input" placeholder="Nombre">' +
	'<input id="email" class="swal2-input" placeholder="Correo electrónico">' */
