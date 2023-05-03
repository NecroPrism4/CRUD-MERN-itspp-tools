import { Router } from 'express';
import { getUsers } from '../controllers/users.controllers.js';
import {
	getInventory,
	getInventoryById,
} from '../controllers/inventory.controllers.js';
import { getLendings } from '../controllers/lendings.controllers.js';

import cors from 'cors';
import { corsOptions } from '../config.js';

const router = Router();
//INVENTORY ROUTES
router.get('/api/inventory/get', getInventory);
router.get('/api/inventory/getById', getInventoryById);

//LENDINGS ROUTES
router.get('/api/lendings/get', getLendings);

//USERS ROUTES
router.get('/api/users/get', getUsers);

export default router;
