const { pool } = require("../../utils/DB");

const employeeMutation = {
    addEmployee:async(_,args)=>{
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
    },

    addEmployeeAndRole:async(_,args)=>{
        const { employee_id,role_id } = args;
        try {
            const date = new Date(Date.now()/1000);

          const client = await pool.connect();
          const result = await client.query(
            'INSERT INTO public.employee_roles (employee_id,role_id,date) VALUES ($1,$2,$3) RETURNING *',
            [employee_id,role_id,date]
          );
          client.release();
          return result.rows[0];
        } catch (err) {
          console.error("Error executing query", err);
          throw new Error("Failed to create user");
        }
    },
    deleteEmployeeAndRole: async (_, args) => {
        const client = await pool.connect();
      
        try {
          await client.query('BEGIN'); // Begin the transaction
      
          const { employee_id } = args;
          
          // Delete from employee_roles table
          await client.query(
            'DELETE FROM public.employee_roles WHERE employee_id = $1',
            [employee_id]
          );
      
          // Delete from employees table
          await client.query(
            'DELETE FROM public.employees WHERE employee_id = $1',
            [employee_id]
          );
      
          // Delete from salaries table
          await client.query(
            'DELETE FROM public.salaries WHERE employee_id = $1',
            [employee_id]
          );
      
          await client.query('COMMIT'); // Commit the transaction
          client.release();
      
          return true; // Return success
        } catch (err) {
          await client.query('ROLLBACK'); // Rollback the transaction in case of error
          client.release();
          console.error("Error executing query", err);
          throw new Error("Failed to delete employee and associated data");
        }
      }
};

module.exports = employeeMutation;