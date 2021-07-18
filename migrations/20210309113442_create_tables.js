exports.up = function (knex) {
  return knex.schema
    .createTable("user_data", (table) => {
      table.increments();
      table.string("name").notNullable();
      table.string("surname").notNullable();
      table.string("middle_name");
      table.string("login").notNullable().unique();
      table.string("password").notNullable();
      table.string("salt").notNullable();
      table.string("leader");
    })
    .createTable("tasks", (table) => {
      table.increments();
      table.string("heading").notNullable();
      table.string("description").notNullable();
      table.date("expiration_date");
      table.date("date_of_creation").notNullable();
      table.date("update_date");
      table.string("priority").notNullable();
      table.string("status").notNullable();
      table.string("the_creator").notNullable();
      table.string("responsible");
    });
};

exports.down = function (knex) {
  return knex.schema.dropTable("user_data").dropTable("tasks");
};
