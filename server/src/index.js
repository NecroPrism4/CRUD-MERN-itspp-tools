import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { PORT } from "./config.js";
import routes from "./routes/index.routes.js";

const port = PORT;
const app = express();

app.listen(port);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(routes);

console.log("Server is running on port " + port);
