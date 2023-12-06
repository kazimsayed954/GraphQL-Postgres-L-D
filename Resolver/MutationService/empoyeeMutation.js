const { pool } = require("../../utils/DB");

const employeeMutation = {
    addEmployee:async(_,args)=>{
        console.log(args)
        const { department_id } = args;
        const { first_name,last_name,email } = args.employee;
        const date = new Date(Date.now()/1000);
        try {
          const client = await pool.connect();
          const result = await client.query(
            'INSERT INTO public.employees (first_name,last_name,email,hire_date,department_id) VALUES ($1,$2,$3,$4,$5) RETURNING *',
            [first_name,last_name,email,date,department_id]
          );
          client.release();
          return result.rows[0];
        } catch (err) {
          console.error("Error executing query", err);
          throw new Error("Failed to create user");
        }
    }
};

module.exports = employeeMutation;