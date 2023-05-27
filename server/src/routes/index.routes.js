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
	createLending,
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
import { loginUser, createUser } from '../controllers/auth.controller.js';
import { getLabExportData } from '../controllers/export.controller.js';

import { verifyToken, isAdmin, isNormal } from '../middleware/authJwt.js';

import cors from 'cors';
import { corsOptions } from '../config.js';

const router = Router();
//INVENTORY ROUTES
router.get('/api/inventory/get', verifyToken, getInventory);
router.get('/api/inventory/getById', verifyToken, isNormal, getInventoryById);
router.put('/api/inventory/updateItem', verifyToken, isNormal, updateItem);
router.post('/api/inventory/createItem', verifyToken, isNormal, createItem);

//LENDINGS ROUTES
router.get('/api/lendings/getCount', verifyToken, getLendingsCount);
router.get('/api/lendings/get', verifyToken, getLendings);
router.put('/api/lendings/updateLending', verifyToken, isNormal, updateLending);
router.put('/api/lendings/returnLending', verifyToken, isNormal, returnLending);
router.put(
	'/api/lendings/cancelReturnLending',
	verifyToken,
	cancelReturnLending
);
router.post(
	'/api/lendings/createLending',
	verifyToken,
	isNormal,
	createLending
);

//PERSONAS ROUTES
router.get('/api/personas/getTabs', verifyToken, getPersonasTabOptions);
router.get('/api/personas/get', verifyToken, getPersonas);
router.put('/api/personas/updatePersona', verifyToken, updatePersona);
router.post('/api/personas/createPersona', verifyToken, createPersona);

//USERS ROUTES
router.get('/api/users/get', verifyToken, isAdmin, getUsers);
router.get('/api/users/getUserTypes', verifyToken, isAdmin, getUserTypes);
router.put('/api/users/updateUser', verifyToken, isAdmin, updateUser);

//LABS ROUTES
router.get('/api/labs/get', verifyToken, isAdmin, getLabs);

//AUTH ROUTES
router.post('/api/auth/login', loginUser);
router.post('/api/auth/signup', createUser);

//Export Data
router.get('/api/export/laboratory', getLabExportData);

export default router;
