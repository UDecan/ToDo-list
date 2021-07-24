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
      login: "admin",
      password: adminPassword,
      role: "admin",
    },
    {
      name: "Николай",
      surname: "Николаев",
      middle_name: "Николаевич",
      login: "user",
      password: userPassword,
      role: "user",
      leader: "admin"
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
