import { pool } from '../db.js';

export const getIndItems = (req, res) => {
	res.send('Obteniendo herramientas');
};

export const getIndItem = (req, res) => {
	res.send('Obteniendo una herramienta');
};

export const createIndItem = (req, res) => {
	const { item_type, item_brand, item_model, item_description, item_remarks } =
		req.body;
	pool.query('');
	res.send('Creando herramienta');
};

export const updateIndItem = (req, res) => {
	res.send('Actualizando herramienta');
};

export const deleteIndItem = (req, res) => {
	res.send('Eliminando herramienta');
};
