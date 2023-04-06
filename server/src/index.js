require('dotenv').config();
const express = require('express');

const port = process.env.SERVER_PORT;
const app = express();

app.listen(port);

console.log('Server is running on port ' + port);
