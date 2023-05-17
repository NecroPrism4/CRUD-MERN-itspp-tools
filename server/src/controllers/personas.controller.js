import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getPersonas = async (req, res) => {
	const page = parseInt(req.query.page) || 1; // Establecer un valor predeterminado para page
	const pageSize = parseInt(req.query.pageSize) || 10; // Establecer un valor predeterminado para pageSize
	const offset = (page - 1) * pageSize; // Calcular el valor de offset
	const conditional = req.query.conditional || []; //Establecer valores booleanos a partir de el req string
	const queryOption = req.query.queryOption || ''; // Establecer un valor predeterminado para searchTerm
	const searchTerm = req.query.searchTerm || ''; // Establecer un valor predeterminado para searchTerm

	try {
		console.log(conditional);
		console.log(queryOption);
		console.log(searchTerm);
		const personas = await prisma.tab_borrower.findMany({
			skip: offset,
			take: pageSize,
			include: {
				lendings: {
					select: {
						lending_id: true,
					},
					where: {
						returned: { equals: false },
					},
				},
			},
			where: {
				...(queryOption === 'borrower_id'
					? {
							[queryOption]:
								searchTerm !== ''
									? { equals: parseInt(searchTerm) }
									: undefined,
					  }
					: { [queryOption]: { contains: searchTerm } }),
				...(conditional.length > 0 && conditional[1] != ''
					? { [conditional[0]]: conditional[1] }
					: {}),
			},
		});
		console.log(personas);
		res.send(personas);
	} catch (error) {
		console.error(error);
		res.status(500).send('Internal server error');
	}
};

export const getPersonasTabOptions = async (req, res) => {
	const tabOption = req.query.tabOption || '';
	try {
		const tabOptions = await prisma.tab_borrower.findMany({
			...(tabOption != ''
				? { select: { [tabOption]: true }, distinct: [tabOption] }
				: {}),
		});
		res.send(tabOptions);
	} catch (error) {
		console.error(error);
		res.status(500).send('Internal server error');
	}
};

export const updatePersona = async (req, res) => {
	const borrower_id = parseInt(req.query.borrower_id) || null;
	const new_borrower_id = parseInt(req.query.new_borrower_id) || borrower_id;
	const borrower_name = req.query.borrower_name || '';
	const borrower_lastname = req.query.borrower_lastname || '';
	const borrower_type = req.query.borrower_type || '';
	const borrower_career = req.query.borrower_career || '';
	const borrower_notes = req.query.borrower_notes || '';

	try {
		console.log(borrower_id);
		const updateResponse = await prisma.tab_borrower.update({
			where: { borrower_id: borrower_id },
			data: {
				borrower_id: new_borrower_id,
				borrower_name: borrower_name,
				borrower_lastname: borrower_lastname,
				borrower_type: borrower_type,
				borrower_career: borrower_career,
				borrower_notes: borrower_notes,
			},
		});
		res.send(updateResponse);
	} catch (err) {
		console.log(err);
		if (err.code === 'P2002') {
			res.status(409).send('El ID ya existe');
		} else {
			res.status(500).send('Internal server error');
		}
	}
};
