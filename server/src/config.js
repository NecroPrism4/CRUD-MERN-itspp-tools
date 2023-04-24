import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.SERVER_PORT;

export const whitelist = ['http://localhost:5173'];

export const corsOptions = {
	origin: function (origin, callback) {
		whitelist.indexOf(origin) != 1
			? callback(null, true)
			: callback(new Error('Not allowed origin by CORS'));
	},
};
