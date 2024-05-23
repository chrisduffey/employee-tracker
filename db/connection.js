const { Pool } = require ("pg");

const db = new Pool({
    host: "localhost",
    user: "postgres",
    password: "root",
    database: "employees",
    port: 5432,
});

module.exports = db;