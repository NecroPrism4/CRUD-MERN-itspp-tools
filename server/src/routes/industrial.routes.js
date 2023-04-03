import { Router } from 'express';
import {
	getIndItems,
	getIndItem,
	createIndItem,
	updateIndItem,
	deleteIndItem,
} from '../controllers/industrial.controllers.js';

const router = Router();

router.get('/industrial', getIndItems);

router.get('/industrial/:id', getIndItem);

router.post('/industrial', createIndItem);

router.put('/industrial/:id', updateIndItem);

router.delete('/industrial/:id', deleteIndItem);

export default router;
