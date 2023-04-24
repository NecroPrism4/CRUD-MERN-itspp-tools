import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getInventory = async (req, res) => {
	try {
		res.send(await prisma.tab_inventory.findMany());
	} catch (error) {
		console.log(error);
		res.status(500).send('Internal server error');
	}
};
