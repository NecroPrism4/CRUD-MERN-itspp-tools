import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getUsers = async (req, res) => {
	res.send(await prisma.tab_inventory.findMany());
};

/*async function get() {
	console.log(
		await prisma.tab_inventory.findMany({
			where: {
				item_lab_id: {
					equals: 33,
				},
			},
		})
	);
}

get();*/
