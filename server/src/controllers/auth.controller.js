import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config.js';

export const loginUser = async (req, res) => {
	const user_email = req.body.user_email || '';
	const user_password = req.body.user_password || '';
	console.log(req.body);
	try {
		const user = await prisma.tab_users.findUnique({
			where: { user_email },
			include: {
				lab: {
					select: {
						lab_name: true,
					},
				},
			},
		});

		if (!user) {
			return res.status(401).send('Usuario o contraseña incorrectos');
		}

		const isPasswordValid = await bcrypt.compare(
			user_password,
			user.user_password
		);

		if (isPasswordValid) {
			// Contraseña coincidente, el usuario está autenticado
			//Correct password, user is authenticated
			const token = jwt.sign({ id: user.user_id }, jwtSecret, {
				expiresIn: '8h',
			});
			return res.status(200).send({ ...user, token });
		} else {
			// Contraseña incorrecta
			//Incorrect password
			return res.status(401).send('Usuario o contraseña incorrectos');
		}
	} catch (err) {
		console.error(err);
		res.status(500).send('Ocurrio un error interno');
	}
};

export const createUser = async (req, res) => {
	const user_id = parseInt(req.body.user_id) || null;
	const user_name = req.body.user_name || '';
	const user_lastname = req.body.user_lastname || '';
	const user_email = req.body.user_email || '';
	const user_password = req.body.user_password || '';

	const encryptedPassword = await bcrypt.hash(user_password, 10);

	try {
		const createdUserResponse = await prisma.tab_users.create({
			data: {
				user_id: user_id,
				user_name: user_name,
				user_lastname: user_lastname,
				user_email: user_email,
				user_password: encryptedPassword,
			},
			select: {
				user_name: true,
				user_lastname: true,
				user_email: true,
				user_id: true,
				user_type: true,
				lab: {
					select: {
						lab_id: true,
						lab_name: true,
					},
				},
			},
		});

		const token = jwt.sign({ id: createdUserResponse.user_id }, jwtSecret, {
			expiresIn: '8h',
		});
		console.log({ ...createdUserResponse, token });
		res.send({ ...createdUserResponse, token });
	} catch (err) {
		console.log(err);
		if (err?.code === 'P2002') {
			res.status(409).send('Este email o ID ya ha sido utilizado');
		} else {
			res.status(500).send('Internal server error');
		}
	}
};
