const { Pool } = require('pg');

const pool = new Pool({
	user: "postgres",
	password: "postgres",
	host: "localhost",
	database: "gym_db",
	port: 5432
});

module.exports = pool;

