exports.up = function (knex) {
    return knex.schema.createTable("admins", tbl => {
        tbl.increments();
        tbl.string("username", 25).notNullable().unique();
        tbl.string("password", 255).notNullable();
        tbl.string("email", 255).notNullable().unique();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists("admins");
};
