const { pool } = require("../utils/DB");
const roleMutation = require("./MutationService/roleMutation");
const departmentMutation = require("./MutationService/departmentMutation");
const employeeMutation = require("./MutationService/empoyeeMutation");
const salaryMutation = require("./MutationService/salaryMutation");

const MutationService = {
  addUser: async (_, args) => {
    const { firstName, lastName, email } = args.user;
    try {
      const client = await pool.connect();
      const result = await client.query(
        'INSERT INTO public.user ("firstName", "lastName",email) VALUES ($1,$2,$3) RETURNING *',
        [firstName, lastName, email]
      );
      client.release();
      return result.rows[0];
    } catch (err) {
      console.error("Error executing query", err);
      throw new Error("Failed to create user");
    }
  },
  updateUser: async (_, args) => {
    const { id } = args;
    const { firstName, lastName, email } = args.edits;
    try {
      const client = await pool.connect();
      const setStatements = [];
      let values = [];

      if (firstName !== undefined) {
        values.push(firstName);
        setStatements.push(`"firstName" = $${values.length}`);
      }

      if (lastName !== undefined) {
        values.push(lastName);
        setStatements.push(`"lastName" = $${values.length}`);
      }

      if (email !== undefined) {
        values.push(email);
        setStatements.push(`"email" = $${values.length}`);
      }
      const updateQuery = `
          UPDATE public.user
          SET ${setStatements.join(", ")}
          WHERE id = ${id}
          RETURNING *
        `;

      const result = await client.query(updateQuery, values);
      client.release();
      values.length = 0;
      return result.rows[0];
    } catch (err) {
      console.error("Error executing query", err);
      throw new Error("Failed to update user");
    }
  },
  deleteUser: async (_, args) => {
    const { id } = args;
    try {
      const client = await pool.connect();
      const result = await client.query("DELETE FROM public.user WHERE id=$1", [
        id,
      ]);
      client.release();
      return result.rowCount > 0;
    } catch (err) {
      console.error("Error executing query", err);
      throw new Error("Failed to create user");
    }
  },
  ...departmentMutation,
  ...employeeMutation,
  ...roleMutation,
  ...salaryMutation
};

module.exports = MutationService;
