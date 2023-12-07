const { pool } = require("../../utils/DB");
const employeeQueryService = {
  getEmployeeAndRoles: async () => {
    try {
      const client = await pool.connect();
      const result = await client.query(
        `
            SELECT ers.*, e.first_name, e.last_name,e.email, r.title,s.salary
            FROM public.employee_roles ers
            INNER JOIN public.employees e ON ers.employee_id = e.employee_id
            INNER JOIN public.roles r ON ers.role_id = r.role_id
            INNER JOIN public.salaries s ON ers.employee_id = s.employee_id
            `
      );
      client.release(); // Release the client back to the pool
      return result.rows; // Return the query result
    } catch (err) {
      console.error("Error executing query", err);
      throw new Error("Failed to fetch users");
    }
  },
  getEmployeeAndRolesById: async (_, args) => {
    const { employee_id } = args;
    try {
      const client = await pool.connect();
      const result = await client.query(
        `
            SELECT ers.*, e.first_name, e.last_name, e.email, r.title, s.salary
            FROM public.employee_roles ers
            INNER JOIN public.employees e ON ers.employee_id = e.employee_id
            INNER JOIN public.roles r ON ers.role_id = r.role_id
            INNER JOIN public.salaries s ON ers.employee_id = s.employee_id
            WHERE ers.employee_id = $1
            `,
        [employee_id]
      );
      client.release(); // Release the client back to the pool

      if (result.rows.length === 0) {
        // If no data found for the specified employee_id
        throw new Error(`Employee with ID ${employee_id} not found`);
      }

      return result.rows[0]; // Return the first row (single object)
    } catch (err) {
      console.error("Error executing query", err);
      throw new Error("Failed to fetch user");
    }
  },
};

module.exports = employeeQueryService;
