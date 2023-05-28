import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import { toBool } from '../helpers/parsers.js';

export const getInventory = async (req, res) => {
	const page = parseInt(req.query.page) || 1; // Establecer un valor predeterminado para page
	const pageSize = parseInt(req.query.pageSize) || 10; // Establecer un valor predeterminado para pageSize
	const offset = (page - 1) * pageSize; // Calcular el valor de offset
	const conditional = toBool(req.query.conditional); //Establecer valores booleanos a partir de el req string
	const queryOption = req.query.queryOption || ''; // Establecer un valor predeterminado para searchTerm
	const searchTerm = req.query.searchTerm || ''; // Establecer un valor predeterminado para searchTerm
	const userType = req.query.userType || 'inactivo';
	const userLabId = parseInt(req.query.userLabId) || null;

	try {
		const items = await prisma.tab_inventory.findMany({
			skip: offset,
			take: pageSize,
			include: {
				lab: {
					select: {
						lab_id: true,
						lab_name: true,
					},
				},
				lendings: {
					select: {
						lendings: {
							select: {
								lending_id: true,
								returned: true,
								borrower: {
									select: {
										borrower_id: true,
										borrower_name: true,
										borrower_lastname: true,
										borrower_type: true,
									},
								},
							},
						},
					},
					where: {
						lendings: {
							returned: { equals: false },
						},
					},
				},
			},
			where: {
				...(conditional != null
					? { item_available: { equals: conditional } }
					: {}),
				[queryOption]: { contains: searchTerm },
				...(userType == 'admin'
					? {}
					: {
							item_lab_id: {
								equals: userLabId,
							},
					  }),
			},
		});
		if (userLabId || userType == 'admin') {
			res.send(items);
		} else {
			res.status(418).send('Laboratorio no asignado');
		}
	} catch (error) {
		res.status(500).send('Internal server error');
	}
};

export const getInventoryById = async (req, res) => {
	const Id = parseInt(req.query.Id) || 1; // Establecer un valor predeterminado para page
	try {
		const item = await prisma.tab_inventory.findMany({
			include: {
				lendings: {
					select: {
						lendings: {
							select: {
								lending_id: true,
								returned: true,
								borrower: {
									select: {
										borrower_id: true,
										borrower_name: true,
										borrower_lastname: true,
										borrower_type: true,
									},
								},
							},
						},
					},
					where: {
						lendings: {
							returned: { equals: false },
						},
					},
				},
			},
			where: {
				item_id: Id,
			},
		});

		res.send(item);
	} catch (error) {
		res.status(500).send('Internal server error');
	}
};

export const updateItem = async (req, res) => {
	const item_id = parseInt(req.body.item_id) || null;
	const item_type = req.body.item_type || '';
	const item_brand = req.body.item_brand || '';
	const item_model = req.body.item_model || '';
	const item_description = req.body.item_description || '';
	const item_remarks = req.body.item_remarks || '';

	try {
		if (item_id) {
			const updateResponse = await prisma.tab_inventory.update({
				where: { item_id: item_id },
				data: {
					item_type: item_type,
					item_brand: item_brand,
					item_model: item_model,
					item_description: item_description,
					item_remarks: item_remarks,
				},
			});
			res.send(updateResponse);
		} else {
			res.status(404).send('Item not found');
		}
	} catch (err) {
		res.status(500).send('Internal server error');
	}
};

export const createItem = async (req, res) => {
	const item_type = req.body.item_type || '';
	const item_brand = req.body.item_brand || '';
	const item_model = req.body.item_model || '';
	const item_description = req.body.item_description || '';
	const item_remarks = req.body.item_remarks || '';
	const item_available = toBool(req.body.item_available) || true;
	const item_lab_id = parseInt(req.body.item_lab_id) || 1;

	try {
		const createResponse = await prisma.tab_inventory.create({
			data: {
				item_type: item_type,
				item_brand: item_brand,
				item_model: item_model,
				item_description: item_description,
				item_remarks: item_remarks,
				item_available: item_available,
				item_lab_id: item_lab_id,
			},
			include: {
				lendings: {
					select: {
						lendings: {
							select: {
								lending_id: true,
								returned: true,
								borrower: {
									select: {
										borrower_id: true,
										borrower_name: true,
										borrower_lastname: true,
										borrower_type: true,
									},
								},
							},
						},
					},
					where: {
						lendings: {
							returned: { equals: false },
						},
					},
				},
			},
		});
		res.send(createResponse);
	} catch (err) {
		res.status(500).send('Internal server error');
	}
};

export const deleteItem = async (req, res) => {
	const item_id = parseInt(req.query.item_id) || null;

	try {
		if (item_id) {
			const deleteLendingHistoryResponse =
				await prisma.lendingsToInventory.deleteMany({
					where: { id_item: item_id },
				});

			const deleteLendingResponse = await prisma.tab_lendings.deleteMany({
				where: {
					items: {
						every: {
							id_item: item_id,
						},
					},
				},
			});

			const deleteResponse = await prisma.tab_inventory.delete({
				where: { item_id: item_id },
			});

			res.send(deleteResponse);
		} else {
			res.status(404).send('Item not found');
		}
	} catch (err) {
		if (err.code == 'P2025') {
			res.status(404).send('Item not found');
		}
		res.status(500).send('Internal server error');
	}
};

export const changeAvailability = async (req, res) => {
	const item_id = parseInt(req.body.item_id) || null;
	const item_available = req.body.item_available;

	try {
		const item = await prisma.tab_inventory.findUnique({
			where: {
				item_id: item_id,
			},
			include: {
				lendings: {
					select: {
						lendings: {
							select: {
								lending_id: true,
								returned: true,
							},
						},
					},
					where: {
						lendings: {
							returned: false,
						},
					},
				},
			},
		});

		if (item?.lendings?.length > 0) {
			res.status(405).send('Este elemento esta asociado a un prestamo activo');
		} else {
			const updateAvail = await prisma.tab_inventory.update({
				where: {
					item_id: item_id,
				},
				data: {
					item_available: !item_available,
				},
				select: {
					item_available: true,
				},
			});
			res.status(200).send(updateAvail);
		}
	} catch (err) {
		res.status(500).send('Internal server error');
	}
};
