const { pool } = require("./utils/DB");

const createTables = async () => {
  const client = await pool.connect();
  try {
    // Create tables
    await client.query(`
      CREATE TABLE IF NOT EXISTS departments (
        department_id SERIAL PRIMARY KEY,
        name VARCHAR(100)
      );

      CREATE TABLE IF NOT EXISTS roles (
        role_id SERIAL PRIMARY KEY,
        title VARCHAR(100),
        salary NUMERIC(10, 2)
      );

      CREATE TABLE IF NOT EXISTS employees (
        employee_id SERIAL PRIMARY KEY,
        first_name VARCHAR(50),
        last_name VARCHAR(50),
        email VARCHAR(100),
        hire_date DATE,
        department_id INT REFERENCES departments(department_id)
      );

      CREATE TABLE IF NOT EXISTS employee_roles (
        employee_id INT REFERENCES employees(employee_id),
        role_id INT REFERENCES roles(role_id),
        date DATE
      );

      CREATE TABLE IF NOT EXISTS salaries (
        employee_id INT REFERENCES employees(employee_id),
        salary NUMERIC(10, 2),
        date DATE
      );
    `);
    console.log("Tables created successfully!");
  } catch (error) {
    console.error("Error creating tables:", error);
  } finally {
    client.release();
  }
};

createTables();
