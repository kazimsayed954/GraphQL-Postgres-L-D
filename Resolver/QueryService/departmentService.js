const { pool } = require("../../utils/DB");

const departmentQueryService = {
    getDepartments: async () => {
        try {
          const client = await pool.connect();
          const result = await client.query(
            "SELECT * FROM public.departments ORDER BY department_id ASC"
          );
          client.release(); // Release the client back to the pool
          return result.rows; // Return the query result
        } catch (err) {
          console.error("Error executing query", err);
          throw new Error("Failed to fetch users");
        }
      },
}

module.exports = departmentQueryService