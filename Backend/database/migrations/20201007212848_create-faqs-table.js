exports.up = function (knex) {
  return knex.schema.createTable("faqs", (tbl) => {
    tbl.increments();

    tbl.string("question", 255).notNullable();

    tbl.string("answer", 1000).notNullable();

    tbl
      .integer("created_by")
      .notNullable()
      .references("id")
      .inTable("admins")
      .onUpdate("cascade")
      .onDelete("cascade");

    tbl.timestamp("created_at").defaultTo(knex.fn.now());

    tbl.timestamp("updated_at").defaultTo(knex.fn.now());

    tbl
      .integer("last_edited_by")
      .notNullable()
      .references("id")
      .inTable("admins")
      .onUpdate("cascade")
      .onDelete("cascade");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("faqs");
};
