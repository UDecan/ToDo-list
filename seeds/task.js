const config = require("config");
const argon = require("argon2");

exports.seed = async function (knex) {
  const tasks = [
    {
      heading: "Задание 1",
      description: "Описание для \"Задание 1\"",
      expiration_date: "31.07.2021",
      date_of_creation: "24.07.2021",
      priority: "высокий",
      status: "выполняется",
      the_creator: "Ivan",
      responsible: "Nikola",
    },
    {
      heading: "Задание 2",
      description: "Описание для \"Задание 2\"",
      expiration_date: "28.07.2021",
      date_of_creation: "22.07.2021",
      priority: "средний",
      status: "к выполнению",
      the_creator: "Ivan",
      responsible: "Nikola",
    },
    {
      heading: "Задание 3",
      description: "Описание для \"Задание 3\"",
      expiration_date: "05.08.2021",
      date_of_creation: "26.07.2021",
      priority: "низкий",
      status: "выполнена",
      the_creator: "Ivan",
      responsible: "Nikola",
    },
    {
      heading: "Задание 4",
      description: "Описание для \"Задание 4\"",
      expiration_date: "10.08.2021",
      date_of_creation: "25.07.2021",
      priority: "средний",
      status: "отменена",
      the_creator: "Ivan",
      responsible: "Nikola",
    },

    {
      heading: "Задание 5",
      description: "Описание для \"Задание 5\"",
      expiration_date: "06.08.2021",
      date_of_creation: "25.07.2021",
      priority: "средний",
      status: "выполняется",
      the_creator: "Danil",
      responsible: "Alexandr",
    },
    {
      heading: "Задание 6",
      description: "Описание для \"Задание 6\"",
      expiration_date: "28.07.2021",
      date_of_creation: "26.07.2021",
      priority: "низкий",
      status: "к выполнению",
      the_creator: "Danil",
      responsible: "Alexandr",
    },
    {
      heading: "Задание 7",
      description: "Описание для \"Задание 7\"",
      expiration_date: "02.08.2021",
      date_of_creation: "27.07.2021",
      priority: "средний",
      status: "выполнена",
      the_creator: "Danil",
      responsible: "Alexandr",
    },
    {
      heading: "Задание 8",
      description: "Описание для \"Задание 8\"",
      expiration_date: "10.08.2021",
      date_of_creation: "28.07.2021",
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
