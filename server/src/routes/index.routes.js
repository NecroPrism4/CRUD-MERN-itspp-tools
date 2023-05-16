import { Router } from 'express';
import {
	getInventory,
	getInventoryById,
	updateItem,
} from '../controllers/inventory.controllers.js';
import {
	getLendings,
	getLendingsCount,
	updateLending,
} from '../controllers/lendings.controllers.js';
import { getUsers, getUserTypes } from '../controllers/users.controllers.js';
import {
	getPersonas,
	getPersonasTabOptions,
	updatePersona,
} from '../controllers/personas.controller.js';
import { getLabs } from '../controllers/labs.controller.js';

import cors from 'cors';
import { corsOptions } from '../config.js';

const router = Router();
//INVENTORY ROUTES
router.get('/api/inventory/get', getInventory);
router.get('/api/inventory/getById', getInventoryById);
router.put('/api/inventory/updateItem', updateItem);

//LENDINGS ROUTES
router.get('/api/lendings/getCount', getLendingsCount);
router.get('/api/lendings/get', getLendings);
router.put('/api/lendings/updateLending', updateLending);

//PERSONAS ROUTES
router.get('/api/personas/getTabs', getPersonasTabOptions);
router.get('/api/personas/get', getPersonas);
router.put('/api/personas/updatePersona', updatePersona);

//USERS ROUTES
router.get('/api/users/get', getUsers);
router.get('/api/users/getUserTypes', getUserTypes);

//LABS ROUTES
router.get('/api/labs/get', getLabs);

export default router;
