import express from 'express';
import { PORT } from './config.js';

import indexRoutes from './routes/index.routes.js';
import industrialRoutes from './routes/industrial.routes.js';

const app = express();

app.use(express.json());

app.use(indexRoutes);
app.use(industrialRoutes);

app.listen(PORT);
console.log(`Server running on port ${PORT}`);
