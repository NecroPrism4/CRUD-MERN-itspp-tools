import { Router } from 'express';
import {
	getInventory,
	getInventoryById,
	UpdateItem,
} from '../controllers/inventory.controllers.js';
import {
	getLendings,
	getLendingsCount,
} from '../controllers/lendings.controllers.js';
import { getUsers, getUserTypes } from '../controllers/users.controllers.js';
import {
	getPersonas,
	getPersonasTabOptions,
} from '../controllers/personas.controller.js';
import { getLabs } from '../controllers/labs.controller.js';
import cors from 'cors';
import { corsOptions } from '../config.js';

const router = Router();
//INVENTORY ROUTES
router.get('/api/inventory/get', getInventory);
router.get('/api/inventory/getById', getInventoryById);
router.put('/api/inventory/updateItem', UpdateItem);

//LENDINGS ROUTES
router.get('/api/lendings/getCount', getLendingsCount);
router.get('/api/lendings/get', getLendings);

//PERSONAS ROUTES
router.get('/api/personas/getTabs', getPersonasTabOptions);
router.get('/api/personas/get', getPersonas);

//USERS ROUTES
router.get('/api/users/get', getUsers);
router.get('/api/users/getUserTypes', getUserTypes);

//LABS ROUTES
router.get('/api/labs/get', getLabs);

export default router;
