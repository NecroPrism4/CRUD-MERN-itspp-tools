import { Router } from 'express';
import {
	getInventory,
	getInventoryById,
	updateItem,
	createItem,
	deleteItem,
	changeAvailability,
} from '../controllers/inventory.controllers.js';
import {
	getLendings,
	getLendingsCount,
	updateLending,
	returnLending,
	cancelReturnLending,
	createLending,
	deleteLending,
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
import {
	loginUser,
	createUser,
	recoverPassword,
} from '../controllers/auth.controller.js';
import {
	getBitacora,
	getRecentBitacora,
	createBitacora,
} from '../controllers/bitacora.controller.js';
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
router.delete('/api/inventory/deleteItem', verifyToken, isNormal, deleteItem);
router.put(
	'/api/inventory/updateAvalability',
	verifyToken,
	isNormal,
	changeAvailability
);

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
router.delete(
	'/api/lendings/deleteLending',
	verifyToken,
	isNormal,
	deleteLending
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
router.put('/api/users/normal/updateUser', verifyToken, updateUser);

//LABS ROUTES
router.get('/api/labs/get', verifyToken, isAdmin, getLabs);

//AUTH ROUTES
router.post('/api/auth/login', loginUser);
router.post('/api/auth/signup', createUser);
router.post('/api/auth/recover', recoverPassword);

//BITACORA ROUTES
router.get('/api/bitacora/get', verifyToken, getBitacora);
/* router.get('/api/bitacora/getRecentBitacora', verifyToken, getRecentBitacora); */
router.post('/api/bitacora/create', verifyToken, createBitacora);

//Export Data
router.get('/api/export/laboratory', verifyToken, getLabExportData);

export default router;
