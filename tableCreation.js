const { pool } = require("./utils/DB");

const createTables = async () => {
  const client = await pool.connect();
  try {
    // Create tables
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
        employee_id INT REFERENCES employees(employee_id),
        role_id INT REFERENCES roles(role_id) ON DELETE CASCADE,
        date DATE
      );

      CREATE TABLE IF NOT EXISTS salaries (
        employee_id INT REFERENCES employees(employee_id) ON DELETE CASCADE,
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

// -- Alter the foreign key constraints to include ON DELETE CASCADE

// -- Alter employee_roles table
// ALTER TABLE public.employee_roles
// DROP CONSTRAINT employee_roles_employee_id_fkey, -- Drop the existing constraint
// ADD CONSTRAINT employee_roles_employee_id_fkey
// FOREIGN KEY (employee_id)
// REFERENCES public.employees(employee_id)
// ON DELETE CASCADE; -- Set the ON DELETE CASCADE action

// -- Alter salaries table
// ALTER TABLE public.salaries
// DROP CONSTRAINT salaries_employee_id_fkey, -- Drop the existing constraint
// ADD CONSTRAINT salaries_employee_id_fkey
// FOREIGN KEY (employee_id)
// REFERENCES public.employees(employee_id)
// ON DELETE CASCADE; -- Set the ON DELETE CASCADE action
