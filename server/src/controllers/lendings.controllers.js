import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import { toBool } from '../helpers/parsers.js';
import { onlyNumbers } from '../helpers/regexes.js';

//Como las funciones getLendings y getCountLendings, se basa en los mismos parámetros where, ahora es una función separada y se llama en ambas funciones
//As the getLendings and getCountLendings functions, relys on the same where parameters, now its a separate function and called in both functions
const buildWhereQuery = (conditional, queryOption, searchTerm, dateFilter) => {
	let where = {
		...(conditional != null ? { returned: { equals: conditional } } : {}),
		...(queryOption === 'lending_id'
			? {
					[queryOption]: onlyNumbers.test(searchTerm)
						? { equals: parseInt(searchTerm) }
						: undefined,
			  }
			: {}),
		...(queryOption === 'borrower_name'
			? {
					borrower: {
						borrower_fullname: { contains: searchTerm },
					},
			  }
			: {}),
		...(queryOption === 'user_name'
			? {
					user: {
						user_fullname: { contains: searchTerm },
					},
			  }
			: {}),
		...(queryOption === 'lending_remarks'
			? {
					lending_remarks: { contains: searchTerm },
			  }
			: {}),

		...(dateFilter.length > 0
			? {
					lending_borrowdate: {
						gte: new Date(dateFilter[0]),
						lte: new Date(dateFilter[1]),
					},
			  }
			: {}),
	};
	return where;
};

export const getLendingsCount = async (req, res) => {
	const conditional = toBool(req.query.conditional); //Establecer valores booleanos a partir de el req string
	const queryOption = req.query.queryOption || ''; // Establecer un valor predeterminado para searchTerm
	const searchTerm = req.query.searchTerm || ''; // Establecer un valor predeterminado para searchTerm
	const dateFilter = req.query.dateFilter || []; // Establecer un valor predeterminado para searchTerm

	const where = buildWhereQuery(
		conditional,
		queryOption,
		searchTerm,
		dateFilter
	);

	try {
		const lendingCount = await prisma.tab_lendings.count({
			where,
		});
		res.send(lendingCount.toString());
	} catch (error) {
		res.status(500).send('Internal server error');
	}
};

export const getLendings = async (req, res) => {
	const page = parseInt(req.query.page) || 1; // Establecer un valor predeterminado para page
	const pageSize = parseInt(req.query.pageSize) || 10; // Establecer un valor predeterminado para pageSize
	const offset = (page - 1) * pageSize; // Calcular el valor de offset
	const conditional = toBool(req.query.conditional); //Establecer valores booleanos a partir de el req string
	const queryOption = req.query.queryOption || ''; // Establecer un valor predeterminado para searchTerm
	const searchTerm = req.query.searchTerm || ''; // Establecer un valor predeterminado para searchTerm
	const dateFilter = req.query.dateFilter || []; // Establecer un valor predeterminado para searchTerm

	const where = buildWhereQuery(
		conditional,
		queryOption,
		searchTerm,
		dateFilter
	);

	try {
		const lendings = await prisma.tab_lendings.findMany({
			skip: offset,
			take: pageSize,
			select: {
				lending_id: true,
				lending_borrowdate: true,
				lending_returneddate: true,
				user: {
					select: {
						user_id: true,
						user_name: true,
						user_lastname: true,
						user_jobposition: true,
					},
				},
				borrower: {
					select: {
						borrower_id: true,
						borrower_name: true,
						borrower_lastname: true,
					},
				},
				id_borrower: true,
				items: {
					select: { items: { select: { item_id: true, item_type: true } } },
				},
				returned: true,
				lending_remarks: true,
			},
			where,
		});
		res.send(lendings);
	} catch (error) {
		res.status(500).send('Internal server error');
	}
};

export const getLendingById = async (req, res) => {
	throw new Error('Not implemented');
};

export const returnLending = async (req, res) => {
	const lending_id = parseInt(req.body.lending_id) || null;
	const id_items = req.body.id_items || [];
	const numItemIds = id_items.map((id) => parseInt(id));

	try {
		if (lending_id) {
			const returnedResponse = await prisma.tab_lendings.update({
				where: {
					lending_id: lending_id,
				},
				data: {
					returned: true,
					lending_returneddate: new Date(),
				},
				select: {
					returned: true,
					lending_returneddate: true,
				},
			});

			const updateItemAvailable = await prisma.tab_inventory.updateMany({
				where: { item_id: { in: numItemIds } },
				data: { item_available: true },
			});

			res.send(returnedResponse);
		} else {
			res.status(404).send('Item not found');
		}
	} catch (err) {
		res.status(500).send('Internal server error');
	}
};

export const cancelReturnLending = async (req, res) => {
	const lending_id = parseInt(req.body.lending_id) || null;
	const id_items = req.body.id_items || [];
	const numItemIds = id_items.map((id) => parseInt(id));

	try {
		if (lending_id) {
			const cancelReturnedResponse = await prisma.tab_lendings.update({
				where: {
					lending_id: lending_id,
				},
				data: {
					returned: false,
					lending_returneddate: null,
				},
				select: {
					returned: true,
					lending_returneddate: true,
				},
			});

			const updateItemAvailable = await prisma.tab_inventory.updateMany({
				where: { item_id: { in: numItemIds } },
				data: { item_available: false },
			});

			res.send(cancelReturnedResponse);
		} else {
			res.status(404).send('Item not found');
		}
	} catch (err) {
		res.status(500).send('Internal server error');
	}
};

export const updateLending = async (req, res) => {
	const lending_id = parseInt(req.body.lending_id) || null;
	const lending_remarks = req.body.lending_remarks || '';

	try {
		if (lending_id != null) {
			const updateResponse = await prisma.tab_lendings.update({
				where: {
					lending_id: lending_id,
				},
				data: {
					lending_remarks: lending_remarks,
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

export const deleteLending = async (req, res) => {
	try {
		throw new Error('Not implemented');
	} catch (err) {
		res.status(500).send('Internal server error: ' + err);
	}
};

export const createLending = async (req, res) => {
	const user_id = parseInt(req.body.user_id) || null;
	const borrower_id = parseInt(req.body.borrower_id) || null;
	const lending_remarks = req.body.lending_remarks || '';
	const items = req.body.items.split(',').map((item) => parseInt(item)) || [];

	try {
		const newLending = await prisma.tab_lendings.create({
			data: {
				id_user: user_id,
				id_borrower: borrower_id,
				lending_borrowdate: new Date(),
				lending_remarks: lending_remarks,
			},
		});

		await prisma.tab_inventory.updateMany({
			where: {
				item_id: { in: items },
			},
			data: { item_available: false },
		});

		await prisma.lendingsToInventory.createMany({
			data: items.map((item) => ({
				id_item: parseInt(item),
				id_lending: newLending.lending_id,
			})),
		});

		res.send(newLending);
	} catch (err) {
		if (err.code === 'P2002') {
			res.status(400).send('Lending already exists');
		}
		res.status(500).send('Internal server error: ' + err);
	}
};
