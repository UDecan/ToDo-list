const config = require("config");
const argon = require("argon2");

exports.seed = async function (knex) {
  const tasks = [
    {
      heading: "Задание 1",
      description: "Описание для \"Задание 1\"",
      expiration_date: "07.31.2021",
      date_of_creation: "07.24.2021",
      priority: "высокий",
      status: "выполняется",
      the_creator: "Ivan",
      responsible: "Nikola",
    },
    {
      heading: "Задание 2",
      description: "Описание для \"Задание 2\"",
      expiration_date: "07.28.2021",
      date_of_creation: "07.22.2021",
      priority: "средний",
      status: "к выполнению",
      the_creator: "Ivan",
      responsible: "Nikola",
    },
    {
      heading: "Задание 3",
      description: "Описание для \"Задание 3\"",
      expiration_date: "08.05.2021",
      date_of_creation: "07.26.2021",
      priority: "низкий",
      status: "выполнена",
      the_creator: "Ivan",
      responsible: "Nikola",
    },
    {
      heading: "Задание 4",
      description: "Описание для \"Задание 4\"",
      expiration_date: "08.10.2021",
      date_of_creation: "07.25.2021",
      priority: "средний",
      status: "отменена",
      the_creator: "Ivan",
      responsible: "Nikola",
    },

    {
      heading: "Задание 5",
      description: "Описание для \"Задание 5\"",
      expiration_date: "08.06.2021",
      date_of_creation: "07.25.2021",
      priority: "средний",
      status: "выполняется",
      the_creator: "Danil",
      responsible: "Alexandr",
    },
    {
      heading: "Задание 6",
      description: "Описание для \"Задание 6\"",
      expiration_date: "07.28.2021",
      date_of_creation: "07.26.2021",
      priority: "низкий",
      status: "к выполнению",
      the_creator: "Danil",
      responsible: "Alexandr",
    },
    {
      heading: "Задание 7",
      description: "Описание для \"Задание 7\"",
      expiration_date: "08.02.2021",
      date_of_creation: "07.27.2021",
      priority: "средний",
      status: "выполнена",
      the_creator: "Danil",
      responsible: "Alexandr",
    },
    {
      heading: "Задание 8",
      description: "Описание для \"Задание 8\"",
      expiration_date: "08.10.2021",
      date_of_creation: "07.28.2021",
      priority: "высокий",
      status: "отменена",
      the_creator: "Danil",
      responsible: "Alexandr",
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
