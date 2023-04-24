import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getInventory = async (req, res) => {
	res.send(await prisma.tab_inventory.findMany());
};
