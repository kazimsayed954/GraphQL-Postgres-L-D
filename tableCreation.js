const { pool } = require("./utils/DB");

const recreateTables = async () => {
  const client = await pool.connect();
  try {
    // Drop existing tables
    await client.query(`
      DROP TABLE IF EXISTS public.employee_roles;
      DROP TABLE IF EXISTS public.salaries;
      DROP TABLE IF EXISTS public.employees;
      DROP TABLE IF EXISTS public.roles;
      DROP TABLE IF EXISTS public.departments;
    `);

    // Recreate tables
    await client.query(`
      CREATE TABLE IF NOT EXISTS departments (
        department_id SERIAL PRIMARY KEY,
        name VARCHAR(100) UNIQUE
      );

      CREATE TABLE IF NOT EXISTS roles (
        role_id SERIAL PRIMARY KEY,
        title VARCHAR(100) UNIQUE
      );

      CREATE TABLE IF NOT EXISTS employees (
        employee_id SERIAL PRIMARY KEY,
        first_name VARCHAR(50),
        last_name VARCHAR(50),
        email VARCHAR(100) UNIQUE,
        hire_date DATE,
        department_id INT REFERENCES departments(department_id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS employee_roles (
        employee_id INT REFERENCES employees(employee_id) ON DELETE CASCADE UNIQUE,
        role_id INT REFERENCES roles(role_id) ON DELETE CASCADE,
        date DATE
      );

      CREATE TABLE IF NOT EXISTS salaries (
        employee_id INT REFERENCES employees(employee_id) ON DELETE CASCADE,
        salary NUMERIC(10, 2),
        date DATE
      );
    `);

    console.log("Tables recreated successfully!");
  } catch (error) {
    console.error("Error recreating tables:", error);
  } finally {
    client.release();
  }
};

recreateTables();
