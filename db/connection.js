const { Pool } = require ("pg");

const db = new Pool({
    host: "localhost",
    user: "postgres",
    password: "VAtech1989",
    database: "employees",
    port: 5432,
});

module.exports = db;