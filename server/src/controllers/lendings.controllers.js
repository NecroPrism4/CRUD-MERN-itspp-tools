import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import { toBool } from '../helpers/parsers.js';

//Como las funciones getLendings y getCountLendings, se basa en los mismos parámetros where, ahora es una función separada y se llama en ambas funciones
//As the getLendings and getCountLendings functions, relys on the same where parameters, now its a separate function and called in both functions
const buildWhereQuery = (conditional, queryOption, searchTerm, dateFilter) => {
	let where = {
		...(conditional != null ? { returned: { equals: conditional } } : {}),
		...(queryOption === 'lending_id'
			? {
					[queryOption]:
						searchTerm !== '' ? { equals: parseInt(searchTerm) } : undefined,
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
		console.log(error);
		res.status(500).send('Internal server error');
	}
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
