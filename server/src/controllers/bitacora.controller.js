import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getBitacora = async (req, res) => {
	const user_id = parseInt(req.query.user_id) || null;

	try {
		const bitacora = await prisma.tab_history.findMany({
			where: {
				...(user_id ? { user_id: user_id } : {}),
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

		console.log(bitacora);

		res.status(200).send(bitacora);
	} catch (err) {
		console.log(err);
		res.status(500).send('Internal server error');
	}
};

export const createBitacora = async (req, res) => {
	const history_date = req.body.history_date || '';
	const history_type = req.body.history_type || '';
	const history_description = req.body.history_description || '';
	const user_id = parseInt(req.body.user_id) || null;

	try {
		const createResponse = await prisma.tab_history.create({
			data: {
				history_date: history_date,
				history_type: history_type,
				history_description: history_description,
				user_id: user_id,
			},
		});

		console.log(createResponse);

		res.send(createResponse);
	} catch (err) {
		console.log(err);
		res.status(500).send('Internal server error');
	}
};
