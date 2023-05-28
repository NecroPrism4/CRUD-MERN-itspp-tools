import { Prisma, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getLabs = async (req, res) => {
	try {
		const labs = await prisma.tab_labs.findMany({
			distinct: 'lab_name',
		});
		res.send(labs);
	} catch (err) {
		res.status(500).json('Internal server error 500');
	}
};
