import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import { toBool } from '../helpers/parsers.js';

export const getLendings = async (req, res) => {
	const page = parseInt(req.query.page) || 1; // Establecer un valor predeterminado para page
	const pageSize = parseInt(req.query.pageSize) || 10; // Establecer un valor predeterminado para pageSize
	const offset = (page - 1) * pageSize; // Calcular el valor de offset
	const conditional = toBool(req.query.conditional); //Establecer valores booleanos a partir de el req string
	const queryOption = req.query.queryOption || ''; // Establecer un valor predeterminado para searchTerm
	const searchTerm = req.query.searchTerm || ''; // Establecer un valor predeterminado para searchTerm

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
					},
				},
				borrower: {
					select: {
						borrower_id: true,
						borrower_name: true,
						borrower_lastname: true,
					},
				},
				items: {
					select: { items: { select: { item_id: true, item_type: true } } },
				},
				returned: true,
				lending_remarks: true,
			},
			where: {
				...(conditional != null ? { returned: { equals: conditional } } : {}),
				...(queryOption == 'lending_id'
					? {
							[queryOption]:
								searchTerm !== ''
									? { equals: parseInt(searchTerm) }
									: undefined,
					  }
					: {}),
				...(queryOption == 'borrower_name'
					? { borrower: { [queryOption]: { contains: searchTerm } } }
					: {}),
				...(queryOption == 'user_name'
					? { user: { [queryOption]: { contains: searchTerm } } }
					: {}),
			},
		});
		res.send(lendings);
	} catch (error) {
		console.log(error);
		res.status(500).send('Internal server error');
	}
};

export const getLendingsCount = async (req, res) => {
	const conditional = toBool(req.query.conditional); //Establecer valores booleanos a partir de el req string
	const queryOption = req.query.queryOption || ''; // Establecer un valor predeterminado para searchTerm
	const searchTerm = req.query.searchTerm || ''; // Establecer un valor predeterminado para searchTerm

	try {
		const lendingCount = await prisma.tab_lendings.count({
			where: {
				...(conditional != null ? { returned: { equals: conditional } } : {}),
				...(queryOption == 'lending_id'
					? {
							[queryOption]:
								searchTerm !== ''
									? { equals: parseInt(searchTerm) }
									: undefined,
					  }
					: {}),
				...(queryOption == 'borrower_name'
					? { borrower: { [queryOption]: { contains: searchTerm } } }
					: {}),
				...(queryOption == 'user_name'
					? { user: { [queryOption]: { contains: searchTerm } } }
					: {}),
			},
		});
		res.send(lendingCount.toString());
	} catch (error) {
		console.log(error);
		res.status(500).send('Internal server error');
	}
};

export const getLendingById = async (req, res) => {
	throw new Error('Not implemented');
};

export const createLending = async (req, res) => {
	throw new Error('Not implemented');
	try {
		const newLending = await prisma.tabla.create({
			data: {
				fechaColumna: {
					create: {
						fecha: {
							now: true,
						},
					},
				},
				// Otros campos del registro
				// ...
			},
		});
		res.send('Registro creado');
	} catch (error) {
		console.log(error);
		res.status(500).send('Internal server error');
	}
};
