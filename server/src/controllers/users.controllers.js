import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config.js';

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
			select: {
				user_id: true,
				user_name: true,
				user_lastname: true,
				user_fullname: true,
				user_email: true,
				user_type: true,
				user_jobposition: true,
				lab_id: true,
				lab: {
					select: {
						lab_name: true,
					},
				},
			},
		});
		res.send(users);
	} catch (err) {
		res.status(500).json({ message: 'Error al obtener los usuarios' });
	}
};

export const updateUser = async (req, res) => {
	const user_id = parseInt(req.body.user_id) || null;
	const new_user_id = parseInt(req.body.new_user_id) || null;
	const user_name = req.body.user_name || '';
	const user_lastname = req.body.user_lastname || '';
	const user_email = req.body.user_email || '';
	const user_password = req.body.user_password || '';
	const user_type = req.body.user_type || '';
	const user_jobposition = req.body.user_jobposition || '';
	const lab_id = parseInt(req.body.lab_id) || null;

	const encryptedPassword = await bcrypt.hash(user_password, 10);

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
				...(user_password ? { user_password: encryptedPassword } : {}),
				...(user_type ? { user_type: user_type } : {}),
				...(user_jobposition ? { user_jobposition: user_jobposition } : {}),
				...(lab_id ? { lab_id: lab_id } : {}),
			},
			select: {
				user_id: true,
				user_name: true,
				user_lastname: true,
				user_email: true,
				user_type: true,
				user_jobposition: true,
				lab: {
					select: {
						lab_id: true,
						lab_name: true,
					},
				},
			},
		});

		if (new_user_id) {
			await prisma.tab_lendings.updateMany({
				where: { id_user: user_id },
				data: { id_user: new_user_id },
			});
		}

		const token = jwt.sign({ id: updateUser.user_id }, jwtSecret, {
			expiresIn: '8h',
		});

		res.send({ ...updateUser, token });
	} catch (err) {
		console.log(err);
		if (err.code === 'P2002') {
			res.status(409).send('El ID ya existe');
		} else {
			res.status(500).send('Internal server error');
		}
	}
};
