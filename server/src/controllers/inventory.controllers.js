import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getInventory = async (req, res) => {
	const page = parseInt(req.query.page) || 1; // Establecer un valor predeterminado para page
	const pageSize = parseInt(req.query.pageSize) || 10; // Establecer un valor predeterminado para pageSize
	const offset = (page - 1) * pageSize; // Calcular el valor de offset
	const searchTerm = req.query.searchTerm || ''; // Establecer un valor predeterminado para searchTerm

	try {
		const items = await prisma.tab_inventory.findMany({
			skip: offset,
			take: pageSize,
			include: {
				lendings: {
					select: {
						returned: true,
					},
				},
			},
			where: {
				item_type: {
					contains: searchTerm,
				},
			},
		});

		res.send(items);
	} catch (error) {
		console.log(error);
		res.status(500).send('Internal server error');
	}
};
