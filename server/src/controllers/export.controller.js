import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getLabExportData = async (req, res) => {
	const report_lab_id = parseInt(req.query.report_lab_id) || null;
	/* const user_type = req.query.user_type || ''; */

	try {
		const inventoryData = await prisma.tab_inventory.findMany({
			where: {
				...(report_lab_id != null
					? { item_lab_id: { equals: report_lab_id } }
					: {}),
			},
		});

		const PendingLendingsData = await prisma.tab_lendings.findMany({
			where: {
				returned: false,
				...(report_lab_id != null
					? {
							user: {
								lab_id: report_lab_id,
							},
					  }
					: {}),
			},
			include: {
				user: {
					select: {
						user_id: true,
						user_fullname: true,
					},
				},
				borrower: {
					select: {
						borrower_id: true,
						borrower_fullname: true,
						borrower_type: true,
					},
				},
			},
		});

		const ReturnedLendingsData = await prisma.tab_lendings.findMany({
			where: {
				returned: true,
				...(report_lab_id != null
					? {
							user: {
								lab_id: report_lab_id,
							},
					  }
					: {}),
			},
			include: {
				user: {
					select: {
						user_id: true,
						user_fullname: true,
					},
				},
				borrower: {
					select: {
						borrower_id: true,
						borrower_fullname: true,
						borrower_type: true,
					},
				},
			},
		});

		const pendingBorrowersData = await prisma.tab_borrower.findMany({
			where: {
				lendings: {
					some: {
						returned: false,
						...(report_lab_id != null
							? {
									user: {
										lab_id: report_lab_id,
									},
							  }
							: {}),
					},
				},
			},
			include: {
				lendings: {
					select: {
						lending_id: true,
						lending_borrowdate: true,
						items: {
							select: {
								items: {
									select: {
										item_type: true,
									},
								},
							},
						},
					},
				},
			},
		});

		const allData = {
			inventoryData: inventoryData,
			PendingLendingsData: PendingLendingsData,
			ReturnedLendingsData: ReturnedLendingsData,
			pendingBorrowersData: pendingBorrowersData,
		};

		res.status(200).send(allData);
	} catch (error) {
		console.error(error);
		res.status(500).send('Ocurrio un error interno');
	}
};
