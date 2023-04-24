import express from 'express';
import cors from 'cors';
import { PORT } from './config.js';
import routes from './routes/other.routes.js';

const port = PORT;
const app = express();

app.listen(port);

app.use(cors());

app.use(routes);

console.log('Server is running on port ' + port);
