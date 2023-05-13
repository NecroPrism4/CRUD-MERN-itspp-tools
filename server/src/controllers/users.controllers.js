import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getUsers = async (req, res) => {
	try {
		const users = await prisma.tab_users.findMany({
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
