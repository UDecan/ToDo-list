const config = require("config");
const argon = require("argon2");

exports.seed = async function (knex) {
  const tasks = [
    {
      heading: "Задание 1",
      description: "Очень подробное описание",
      expiration_date: "27.07.2021",
      date_of_creation: "24.07.2021",
      priority: "высокий",
      status: "выполняется",
      the_creator: "admin",
      responsible: "user",
    },
    {
      heading: "Задание 2",
      description: "Плохое и не подробное описание",
      expiration_date: "28.07.2021",
      date_of_creation: "22.07.2021",
      priority: "средний",
      status: "к выполнению",
      the_creator: "admin",
      responsible: "user",
    },
  ];

  // Deletes ALL existing entries
  return knex("tasks")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("tasks").insert(tasks);
    });
};
