import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import { toBool } from '../helpers/parsers.js';

export const getInventory = async (req, res) => {
	const page = parseInt(req.query.page) || 1; // Establecer un valor predeterminado para page
	const pageSize = parseInt(req.query.pageSize) || 10; // Establecer un valor predeterminado para pageSize
	const offset = (page - 1) * pageSize; // Calcular el valor de offset
	const isAvailable = toBool(req.query.isAvailable); //Establecer valores booleanos a partir de el req string
	const queryOption = req.query.queryOption || ''; // Establecer un valor predeterminado para searchTerm
	const searchTerm = req.query.searchTerm || ''; // Establecer un valor predeterminado para searchTerm

	try {
		const items = await prisma.tab_inventory.findMany({
			skip: offset,
			take: pageSize,
			include: {
				lendings: {
					select: {
						returned: true,
						id_borrower: true,
						borrower: {
							select: {
								borrower_name: true,
								borrower_lastname: true,
								borrower_type: true,
							},
						},
					},
					where: {
						returned: false,
					},
				},
			},
			where: {
				...(isAvailable != null
					? { item_available: { equals: isAvailable } }
					: {}),
				[queryOption]: {
					contains: searchTerm,
				},
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
