const { Pool } = require("pg");

const pool = new Pool({
  user: "learning",
  password: "learning",
  host: "localhost",
  database: "postgres-learning&development",
  port: 5432,
});

module.exports = {
    pool
}