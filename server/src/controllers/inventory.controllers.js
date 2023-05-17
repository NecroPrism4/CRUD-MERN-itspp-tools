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

	try {
		const items = await prisma.tab_inventory.findMany({
			skip: offset,
			take: pageSize,
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
				...(conditional != null
					? { item_available: { equals: conditional } }
					: {}),
				[queryOption]: { contains: searchTerm },
			},
		});

		res.send(items);
	} catch (error) {
		console.log(error);
		res.status(500).send('Internal server error');
	}
};

export const getInventoryById = async (req, res) => {
	const Id = parseInt(req.query.Id) || 1; // Establecer un valor predeterminado para page
	try {
		const item = await prisma.tab_inventory.findMany({
			where: {
				item_id: Id,
			},
		});

		res.send(item);
	} catch (error) {
		console.log(error);
		res.status(500).send('Internal server error');
	}
};

export const updateItem = async (req, res) => {
	const item_id = parseInt(req.query.item_id) || null;
	const item_type = req.query.item_type || '';
	const item_brand = req.query.item_brand || '';
	const item_model = req.query.item_model || '';
	const item_description = req.query.item_description || '';
	const item_remarks = req.query.item_remarks || '';

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
		console.log(err);
		res.status(500).send('Internal server error');
	}
};
