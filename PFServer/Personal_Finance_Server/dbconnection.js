const { password } = require("pg/lib/defaults");

const Pool = require("pg").Pool;
const pool = new Pool({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "Nithin@2001",
  database: "PersonalFinance",
});

module.exports = pool;
