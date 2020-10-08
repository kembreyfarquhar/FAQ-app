exports.up = function (knex) {
    return knex.schema.createTable("admins", tbl => {
        tbl.increments();
        tbl.string("email", 255).notNullable().unique();
        tbl.string("password", 255).notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists("admins");
};
