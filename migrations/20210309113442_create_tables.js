exports.up = function (knex) {
  return knex.schema
    .createTable("user_data", (table) => {
      table.string("name").notNullable();
      table.string("surname").notNullable();
      table.string("middle_name");
      table.string("login").notNullable().unique();
      table.string("password").notNullable();
      table.string("role").notNullable();
      table.string("leader");
      table.primary("login");
    })
    .createTable("tasks", (table) => {
      table.increments();
      table.string("heading").notNullable();
      table.string("description").notNullable();
      table.date("expiration_date").notNullable();
      table.date("date_of_creation").notNullable();
      table.date("update_date");
      table.string("priority").notNullable();
      table.string("status").notNullable();
      table.string("the_creator").notNullable().references("login").inTable("user_data");
      table.string("responsible").notNullable().references("login").inTable("user_data");
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTable("tasks")
    .dropTable("user_data");
};
