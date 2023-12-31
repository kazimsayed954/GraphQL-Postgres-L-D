const { pool } = require("../utils/DB");
const departmentQueryService = require("./QueryService/departmentService");
const employeeQueryService = require("./QueryService/employeeQuery");
const roleQueryService = require("./QueryService/roleQueryService");

const QueryService = {
  getUsers: async () => {
    try {
      const client = await pool.connect();
      const result = await client.query(
        "SELECT * FROM public.user ORDER BY id ASC "
      );
      client.release(); // Release the client back to the pool

      return result.rows; // Return the query result
    } catch (err) {
      console.error("Error executing query", err);
      throw new Error("Failed to fetch users");
    }
  },
  getUser: async (_, args) => {
    try {
      const { id } = args;
      const client = await pool.connect();
      const result = await client.query(
        "SELECT * FROM public.user Where id=$1",
        [id]
      );
      client.release(); // Release the client back to the pool

      return result.rows[0]; // Return the query result
    } catch (err) {
      console.error("Error executing query", err);
      throw new Error("Failed to fetch users");
    }
  },
  getUserByName: async (_, args) => {
    try {
      const { query } = args;
      const client = await pool.connect();
        const result = await client.query(
          'SELECT * FROM public.user WHERE "firstName" ILIKE $1 or "lastName" ILIKE $1',
          [`%${query}%`] // Using $1 as a placeholder for the parameterized query
        );
   
      client.release(); // Release the client back to the pool
      return result.rows; // Return the query result
    } catch (err) {
      console.error("Error executing query", err);
      throw new Error("Failed to fetch users");
    }
  },
  ...employeeQueryService,
  ...departmentQueryService,
  ...roleQueryService
};

module.exports = QueryService;
