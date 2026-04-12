const express = require("express");
const {Pool} = require("pg");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

const pool = new Pool({
	user: "postgres",
	password: "postgres",
	host: "localhost",
	database: "gym_db",
	port: 5432
});

