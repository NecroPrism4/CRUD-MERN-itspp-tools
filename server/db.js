import { createPool } from 'mysql2/promise';

export const pool = createPool({
	host: '192.168.1.108',
	port: 3306,
	user: 'root',
	password: 'itspp',
	database: 'itspp-toolsdb',
});
