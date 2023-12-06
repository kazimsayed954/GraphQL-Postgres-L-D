const { Pool } = require("pg");

const pool = new Pool({
  user: "learning",
  password: "learning",
  host: "localhost",
  database: "typeorm_learning_01",
  port: 5432,
});

module.exports = {
    pool
}