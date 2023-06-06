import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getBitacora = async (req, res) => {
	const page = parseInt(req.query.page) || 1; // Establecer un valor predeterminado para page
	const pageSize = parseInt(req.query.pageSize) || 10; // Establecer un valor predeterminado para pageSize
	const offset = (page - 1) * pageSize; // Calcular el valor de offset
	const user_id = parseInt(req.query.conditional) || null;
	const user_type = req.query.userType || 'inactivo';

	try {
		const bitacora = await prisma.tab_history.findMany({
			take: pageSize,
			skip: offset,
			orderBy: {
				history_date: 'desc',
			},
			where: {
				...(user_id && user_type != 'admin' ? { id_user: user_id } : {}),
			},
			include: {
				user: {
					select: {
						user_id: true,
						user_fullname: true,
					},
				},
			},
		});

		res.status(200).send(bitacora);
	} catch (err) {
		res.status(500).send('Internal server error');
	}
};

export const getRecentBitacora = async (req, res) => {
	const user_id = parseInt(req.query.user_id) || null;

	try {
		const userBitacora = await prisma.tab_history.findMany({
			take: 5,
			orderBy: {
				history_date: 'desc',
			},
			where: {
				...(user_id ? { id_user: user_id } : {}),
			},
		});

		res.status(200).send(userBitacora);
	} catch (err) {
		res.status(500).send('Internal server error');
	}
};

export const createBitacora = async (req, res) => {
	const history_type = req.body.history_type || '';
	const history_description = req.body.history_description || '';
	const user_id = parseInt(req.body.user_id) || null;

	try {
		const createResponse = await prisma.tab_history.create({
			data: {
				history_date: new Date(),
				history_type: history_type,
				history_description: history_description,
				id_user: user_id,
			},
		});

		res.send(createResponse);
	} catch (err) {
		console.log(err);
		res.status(500).send('Internal server error');
	}
};
