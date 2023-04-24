import express from 'express';
import { PORT } from './config.js';
import userRoutes from './routes/users.routes.js';

const port = PORT;
const app = express();

app.listen(port);

app.use(userRoutes);

console.log('Server is running on port ' + port);
