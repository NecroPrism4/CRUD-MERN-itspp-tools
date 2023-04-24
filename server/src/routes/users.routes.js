import { Router } from 'express';
import { getUsers } from '../controllers/users.controllers.js';

const router = Router();

router.get('/api/users/get', getUsers);

export default router;
