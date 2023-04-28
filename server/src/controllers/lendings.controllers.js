import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getLendings = async (req, res) => {
	try {
		const lendings = await prisma.tab_lendings.findMany({
			select: {
				lending_id: true,
				lending_borrowdate: true,
				lending_returneddate: true,
				user: {
					select: {
						user_id: true,
						user_name: true,
						user_lastname: true,
					},
				},
				borrower: {
					select: {
						borrower_id: true,
						borrower_name: true,
						borrower_lastname: true,
					},
				},
				item: {
					select: {
						item_id: true,
						item_type: true,
					},
				},
				returned: true,
				lending_remarks: true,
			},
		});
		res.send(lendings);
	} catch (error) {
		console.log(error);
		res.status(500).send('Internal server error');
	}
};
