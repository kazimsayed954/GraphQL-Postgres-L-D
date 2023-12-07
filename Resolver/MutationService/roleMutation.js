const { pool } = require("../../utils/DB");

const roleMutation = {
  addRole: async (_, args) => {
    const { title } = args.role;

    try {
      const client = await pool.connect();
      const result = await client.query(
        "INSERT INTO public.roles (title) VALUES ($1) RETURNING *",
        [title]
      );
      client.release();
      return result.rows[0];
    } catch (err) {
      console.error("Error executing query", err);
      throw new Error("Failed to create user");
    }
  },
  deleteRole: async (_, args) => {
    const { role_id } = args;

    try {
      const client = await pool.connect();
      const result = await client.query(
        "DELETE FROM public.roles WHERE role_id = $1 RETURNING *",
        [role_id]
      );
      client.release();
      return result.rowCount > 0;
    } catch (err) {
      console.error("Error executing query", err);
      throw new Error("Failed to delete role");
    }
  },
  updateRole: async (_, args) => {
    const { role_id, title } = args;

    try {
      const client = await pool.connect();
      const result = await client.query(
        "UPDATE public.roles SET title = $2 WHERE role_id=$1  RETURNING *",
        [role_id, title]
      );
      client.release();
      return result.rows[0];
    } catch (err) {
      console.error("Error executing query", err);
      throw new Error("Failed to update role");
    }
  },
};

module.exports = roleMutation;
