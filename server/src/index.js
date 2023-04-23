import { PORT } from './config.js';
import express from 'express';
import { PrismaClient } from '@prisma/client';

const port = PORT;
const app = express();
const prisma = new PrismaClient();

app.listen(port);

console.log('Server is running on port ' + port);
