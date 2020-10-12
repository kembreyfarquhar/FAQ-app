const db = require("../../database/dbConfig");

module.exports = {
  add,
  findById,
  findByEmail,
  updatePassword,
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

async function updatePassword(email, password) {
  const [updatedUser] = await db("admins")
    .where({ email })
    .update({ password })
    .returning("*");
  return updatedUser;
}
