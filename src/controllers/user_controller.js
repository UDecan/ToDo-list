const db = require('../db');
const argon = require('argon2');
const config = require("config");
const jwt = require("jsonwebtoken");

const validators = {
  password: require("../middlewares/validation/password/password").validate,
  login: require("../middlewares/validation/login/login").validate,
};



async function hashPassword(password) {
  const saltPwd = password + config.staticSalt;

  const pwdHash = await argon.hash(saltPwd);

  return pwdHash;
};

async function getUserInfo(req, res) {
  const { login } = req.user;

  const candidate = (await db('user_data').where({ login }).select())[0];


  if (!candidate) {
    return res.status(400).json({
      message: "Непредвиденная ошибка!"
    });
  }

  res.status(200).json({ candidate });
}

async function registerUser(req, res) {
  const { name, surname, middle_name, login, password, leader } = req.body;

  if (!!login && !validators.login(login)) {
    return res.status(400).json({
      message: "Неверный логин"
    });
  }
  if (!!password && !validators.password(password)) {
    return res.status(400).json({
      message: "Неверный пароль"
    });
  }

  const candidate = (await db('user_data').where({ login }).select())[0];


  if (candidate) {
    return res.status(400).json({
      message: "Пользователь с таким логином уже существует"
    });
  }

  const leaderLogin = (await db('user_data').where({ login: leader }).select())[0];


  if (!!leader && !leaderLogin && leaderLogin?.role !== 'admin') {
    return res.status(400).json({
      message: "Руководителя с таким логином не существует"
    });
  }

  const hashPwd = await hashPassword(password);

  const newUser = await db('user_data').insert({
    name,
    surname,
    middle_name,
    login,
    password: hashPwd,
    role: `user`,
    leader
  })

  res.status(200).json({ message: "Пользователь успешно зарегистрирован!" });
};

async function authorizeUser(req, res) {
  try {
    const { login, password } = req.body;

    const candidate = (
      await db('user_data').where({ login }).select()
    )[0];

    if (!candidate) {
      return res.status(400).json({
        message: "Пользователь c таким логином не зарегистрирован"
      });
    }

    const saltpwd = password + config.staticSalt;

    const match = await argon.verify(candidate.password, saltpwd);

    if (match) {
      const token = await jwt.sign(
        {
          login,
          role: candidate.role,
          leader: candidate.leader
        },
        config.jwtsecret,
        {
          expiresIn: "1h",
        }
      );

      return res.status(200).json({ token, login });
    }
    else {
      return res.status(400).json({
        message: "Неверно введен пароль"
      });
    }
  }
  catch (e) {
    console.error(e.message);
    return res.status(500).json({
      message: e.message
    });
  }
};

async function editUser(req, res) {
  const { login } = req.user;
  const { leader, name, surname, middle_name } = req.body;

  const leaderLogin = (await db('user_data').where({ login: leader }).select())[0];

  if (!!leader && !leaderLogin || leaderLogin?.role !== 'admin') {
    return res.status(400).json({
      message: "Руководителя с таким логином не существует"
    });
  }

  const candidate = (await db('user_data').where({ login }).select())[0];


  if (!candidate) {
    return res.status(400).json({
      message: "Непредвиденная ошибка!"
    });
  }

  try {
    const responseData = await db("user_data")
      .where({ login })
      .update({
        name,
        surname,
        middle_name,
        leader
      });

    res.status(200).json({ message: "Пользователь успешно изменен!" });
  }
  catch {
    return res.status(400).json({
      message: "Непредвиденная ошибка!"
    });
  }
};

async function deleteUser(req, res) { // ???
  const { login } = req.body;

  const candidate = await db("user_data")
    .where({ login })
    .del();

  res.status(200).json({
    message: candidate,
  });
};

module.exports = { registerUser, authorizeUser, editUser, deleteUser, getUserInfo };