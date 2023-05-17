import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getUserTypes = async (req, res) => {
	try {
		const userTypes = await prisma.tab_users.findMany({
			select: {
				user_type: true,
			},
			distinct: 'user_type',
		});
		res.send(userTypes);
	} catch (err) {
		console.error(err);
		res.status(500).send('Internal server error');
	}
};

export const getUsers = async (req, res) => {
	const page = parseInt(req.query.page) || 1; // Establecer un valor predeterminado para page
	const pageSize = parseInt(req.query.pageSize) || 10; // Establecer un valor predeterminado para pageSize
	const offset = (page - 1) * pageSize; // Calcular el valor de offset

	try {
		const users = await prisma.tab_users.findMany({
			skip: offset,
			take: pageSize,
			include: {
				lab: {
					select: {
						lab_name: true,
					},
				},
			},
		});
		res.send(users);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: 'Error al obtener los usuarios' });
	}
};

export const updateUser = async (req, res) => {
	const user_id = parseInt(req.query.user_id) || null;
	const new_user_id = parseInt(req.query.new_user_id) || null;
	const user_name = req.query.user_name || '';
	const user_lastname = req.query.user_lastname || '';
	const user_email = req.query.user_email || '';
	const user_password = req.query.user_password || '';
	const user_type = req.query.user_type || '';
	const user_jobposition = req.query.user_jobposition || '';
	const lab_id = parseInt(req.query.lab_id) || null;

	try {
		const updateUser = await prisma.tab_users.update({
			where: {
				user_id: user_id,
			},
			data: {
				...(new_user_id ? { user_id: new_user_id } : {}),
				...(user_name ? { user_name: user_name } : {}),
				...(user_lastname ? { user_lastname: user_lastname } : {}),
				...(user_email ? { user_email: user_email } : {}),
				...(user_password ? { user_password: user_password } : {}),
				...(user_type ? { user_type: user_type } : {}),
				...(user_jobposition ? { user_jobposition: user_jobposition } : {}),
				...(lab_id ? { lab_id: lab_id } : {}),
			},
		});
		res.send(updateUser);
	} catch (err) {
		console.log(err);
		if (err.code === 'P2002') {
			res.status(409).send('El ID ya existe');
		} else {
			res.status(500).send('Internal server error');
		}
	}
};
