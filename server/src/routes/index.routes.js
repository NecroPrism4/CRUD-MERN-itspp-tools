import { Router } from 'express';
import {
	getInventory,
	getInventoryById,
	updateItem,
	createItem,
} from '../controllers/inventory.controllers.js';
import {
	getLendings,
	getLendingsCount,
	updateLending,
	returnLending,
	cancelReturnLending,
} from '../controllers/lendings.controllers.js';
import {
	getUsers,
	getUserTypes,
	updateUser,
} from '../controllers/users.controllers.js';
import {
	getPersonas,
	getPersonasTabOptions,
	updatePersona,
	createPersona,
} from '../controllers/personas.controller.js';
import { getLabs } from '../controllers/labs.controller.js';

import cors from 'cors';
import { corsOptions } from '../config.js';

const router = Router();
//INVENTORY ROUTES
router.get('/api/inventory/get', getInventory);
router.get('/api/inventory/getById', getInventoryById);
router.put('/api/inventory/updateItem', updateItem);
router.post('/api/inventory/createItem', createItem);

//LENDINGS ROUTES
router.get('/api/lendings/getCount', getLendingsCount);
router.get('/api/lendings/get', getLendings);
router.put('/api/lendings/updateLending', updateLending);
router.put('/api/lendings/returnLending', returnLending);
router.put('/api/lendings/cancelReturnLending', cancelReturnLending);

//PERSONAS ROUTES
router.get('/api/personas/getTabs', getPersonasTabOptions);
router.get('/api/personas/get', getPersonas);
router.put('/api/personas/updatePersona', updatePersona);
router.post('/api/personas/createPersona', createPersona);

//USERS ROUTES
router.get('/api/users/get', getUsers);
router.get('/api/users/getUserTypes', getUserTypes);
router.put('/api/users/updateUser', updateUser);

//LABS ROUTES
router.get('/api/labs/get', getLabs);

export default router;
