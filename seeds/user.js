const config = require("config");
const argon = require("argon2");

exports.seed = async function (knex) {
  const adminSaltPwd = "Admin123" + config.staticSalt;
  const adminPassword = await argon.hash(adminSaltPwd);

  const userSaltPwd = "User123" + config.staticSalt;
  const userPassword = await argon.hash(userSaltPwd);

  const users = [
    {
      name: "Иван",
      surname: "Иванов",
      middle_name: "Иванович",
      login: "Ivan",
      password: adminPassword,
      role: "admin",
    },
    {
      name: "Данил",
      surname: "Данилов",
      middle_name: "Данилович",
      login: "Danil",
      password: adminPassword,
      role: "admin",
    },
    {
      name: "Николай",
      surname: "Николаев",
      middle_name: "Николаевич",
      login: "Nikola",
      password: userPassword,
      role: "user",
      leader: "Ivan"
    },
    {
      name: "Алексей",
      surname: "Алексеев",
      middle_name: "Алексеевич",
      login: "Alex",
      password: userPassword,
      role: "user",
      leader: "Ivan"
    },
    {
      name: "Александр",
      surname: "Александров",
      middle_name: "Александрович",
      login: "Alexandr",
      password: userPassword,
      role: "user",
      leader: "Danil"
    },
  ];

  // Deletes ALL existing entries
  return knex("user_data")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("user_data").insert(users);
    });
};
