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
    }
};

module.exports = departmentMutation;