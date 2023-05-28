import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config.js';
import { transporter } from '../helpers/mailer.js';
import { randomPassword } from '../helpers/randPassword.js';

export const loginUser = async (req, res) => {
	const user_email = req.body.user_email || '';
	const user_password = req.body.user_password || '';

	try {
		const user = await prisma.tab_users.findUnique({
			where: { user_email },
			include: {
				lab: {
					select: {
						lab_id: true,
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
			delete user.user_password;
			return res.status(200).send({ ...user, token });
		} else {
			// Contraseña incorrecta
			//Incorrect password
			return res.status(401).send('Usuario o contraseña incorrectos');
		}
	} catch (err) {
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
			include: {
				lab: {
					select: {
						lab_id: true,
						lab_name: true,
					},
				},
			},
		});

		delete createdUserResponse.user_password;

		const token = jwt.sign({ id: createdUserResponse.user_id }, jwtSecret, {
			expiresIn: '8h',
		});
		res.send({ ...createdUserResponse, token });
	} catch (err) {
		if (err?.code === 'P2002') {
			res.status(409).send('Este email o ID ya ha sido utilizado');
		} else {
			res.status(500).send('Internal server error');
		}
	}
};

export const recoverPassword = async (req, res) => {
	const user_email = req.body.user_email || '';
	const newPass = randomPassword();

	const encryptedPassword = await bcrypt.hash(newPass, 10);

	const existingRecord = await prisma.tab_users.findUnique({
		where: { user_email: user_email },
	});
	try {
		if (existingRecord) {
			await transporter.sendMail({
				from: `"Olvido su contraseña?" <${process.env.MAILER_USER}>`,
				subject: 'Gestor de Laboratorio - Recuperar contraseña',
				html: `<html>
					<head>
						<style>
							@import url('https://fonts.googleapis.com/css2?family=Baloo+Thambi+2:wght@400;600&display=swap');
		
								body {
									font-family: 'Baloo Thambi 2', Arial, sans-serif;
									background-color: #f2f2f2;
									color: #333333;
								}
			
								h1 {
									color: #337ab7;
								}
			
								.container {
									max-width: 600px;
									margin: 0 auto;
									padding: 20px;
									background-color: #ffffff;
									border: 1px solid #dddddd;
									border-radius: 25px;
									box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
								}
		
							.text-center, .Password{
								text-align: center;
								font-family: 'Baloo Thambi 2', Arial, sans-serif;
							}
							p {
								font-family: 'Baloo Thambi 2', Arial, sans-serif;
								color: #292d32;
								font-size: 16px;
							}
						</style>
					</head>
					<body>
						<div class="container">
							<h1 class="text-center">Recuperar contraseña</h1>
							<p>¡Hola!</p>
							<p>Hemos recibido una solicitud para recuperar tu contraseña. A continuación, encontrarás la contraseña generada aleatoriamente:</p>
							<p class="Password"><strong>${newPass}</strong></p>
							<p>Por favor, inicia sesión con esta contraseña y cambia tu contraseña de inmediato.</p>
							<p>Si no has solicitado esta recuperación de contraseña, puedes ignorar este correo.</p>
							<p>¡Gracias!, Equipo de Gestor de Laboratorio</p>
						</div>
					</body>
				</html>`,
				to: req.body.user_email,
			});

			await prisma.tab_users.update({
				where: { user_email: user_email },
				data: {
					user_password: encryptedPassword,
				},
			});
			res.status(200).send('Se ha enviado un correo con la nueva contraseña');
		} else {
			res.status(404).send('No se encontro el correo');
		}
	} catch (err) {
		res.status(500).send('Ocurrio un error interno');
	}
};
