import { Router } from 'express';
import { getUsers } from '../controllers/users.controllers.js';
import { getInventory } from '../controllers/inventory.controllers.js';

import cors from 'cors';
import { corsOptions } from '../config.js';

const router = Router();
//INVENTORY ROUTES
router.get('/api/inventory/get', cors(corsOptions), getInventory);

//USERS ROUTES
router.get('/api/users/get', cors(corsOptions), getUsers);

export default router;
