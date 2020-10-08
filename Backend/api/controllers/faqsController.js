const db = require("../../database/dbConfig");

module.exports = {
  find,
  findById,
  add,
  update,
  remove,
};

function find() {
  return db("faqs");
}

function findById(id) {
  return db("faqs").where({ id }).first();
}

async function add(faq) {
  const [newFaq] = await db("faqs").insert(faq).returning("*");

  return newFaq;
}

async function update(changes, id) {
  const [updatedFaq] = await db("faqs")
    .where({ id })
    .update(changes)
    .returning("*");

  return updatedFaq;
}

function remove(id) {
  return db("faqs").where(id).del();
}
