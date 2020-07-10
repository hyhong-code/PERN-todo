const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "11271127",
  host: "localhost",
  port: 5500,
  database: "perntodo",
});

module.exports = pool;
