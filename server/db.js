// connect to database
require("dotenv").config();
const { Client } = require("pg");

const config = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
};

const client = new Client(config);
module.exports = client;

