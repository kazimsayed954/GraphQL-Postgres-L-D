const { pool } = require("../../utils/DB");

const departmentMutation = {
    addDepartment:async(_,args)=>{
        const { name } = args;
        try {
          const client = await pool.connect();
          const result = await client.query(
            'INSERT INTO public.departments (name) VALUES ($1) RETURNING *',
            [name]
          );
          client.release();
          return result.rows[0];
        } catch (err) {
          console.error("Error executing query", err);
          throw new Error("Failed to create user");
        }
    },

  updateDepartment: async (_, args) => {
    const { department_id, name } = args;

    try {
      const client = await pool.connect();
      const result = await client.query(
        'UPDATE public.departments SET name = $1 WHERE department_id = $2 RETURNING *',
        [name, department_id]
      );
      client.release();
      return result.rows[0];
    } catch (err) {
      console.error("Error executing query", err);
      throw new Error("Failed to update department");
    }
  },
  deleteDepartment: async (_, args) => {
    const { department_id } = args;

    try {
      const client = await pool.connect();
      const result = await client.query(
        'DELETE FROM public.departments WHERE department_id = $1 RETURNING *',
        [department_id]
      );
      client.release();
      return result.rowCount>0;
    } catch (err) {
      console.error("Error executing query", err);
      throw new Error("Failed to delete department");
    }
  },
};

module.exports = departmentMutation;