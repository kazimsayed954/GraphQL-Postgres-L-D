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
}

module.exports = employeeQueryService;

