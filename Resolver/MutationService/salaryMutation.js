const { pool } = require("../../utils/DB");

const salaryMutation = {
  addSalary: async (_, args) => {
    const { employee_id, salary } = args.salary;
    const date = new Date(Date.now()/1000);

    try {
      const client = await pool.connect();
      const result = await client.query(
        "INSERT INTO public.salaries (employee_id,salary,date) VALUES ($1,$2,$3) RETURNING *",
        [employee_id, salary,date]
      );
      client.release();
      return result.rows[0];
    } catch (err) {
      console.error("Error executing query", err);
      throw new Error("Failed to create user");
    }
  },
};

module.exports = salaryMutation;
