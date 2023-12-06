const { pool } = require("../../utils/DB");

const roleMutation = {
    addRole:async(_,args)=>{
        const { title,salary } = args.role;
      
        try {
          const client = await pool.connect();
          const result = await client.query(
            'INSERT INTO public.roles (title,salary) VALUES ($1,$2) RETURNING *',
            [ title,salary]
          );
          client.release();
          return result.rows[0];
        } catch (err) {
          console.error("Error executing query", err);
          throw new Error("Failed to create user");
        }
    }
};

module.exports = roleMutation;