const db = require("../../database/dbConfig");

module.exports = {
  add,
  findById,
  findByEmail,
};

async function add(admin) {
  const [newAdmin] = await db("admins").insert(admin).returning("*");
  return newAdmin;
}

function findById(id) {
  return db("admins").where({ id }).first();
}

function findByEmail(email) {
  return db("admins").where({ email }).first();
}
