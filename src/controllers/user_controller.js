const db = require('../db');
const argon = require('argon2');

const validators = {
  password: require("../middlewares/validation/password/password").validate,
  login: require("../middlewares/validation/login/login").validate,
};

class UserController {
  async hashPassword(password) {
    const saltPwd = password + config.staticSalt;

    const pwdHash = await argon.hash(saltPwd);

    return [pwdHash, salt];
  };

  async registerUser(req, res) {
    const { name, surname, middle_name, login, password, leader } = req.body;

    if (!!login && !validators.login(login)) {
      return res.status(500).json({
        message: "Неверный логин"
      });
    }
    if (!!password && !validators.password(password)) {
      return res.status(500).json({
        message: "Неверный пароль"
      });
    }

    const candidate = await db
      .select('login')
      .where({ login })
      .from('user_data');

    if (candidate) {
      return res.status(500).json({
        message: "Пользователь с таким логином уже существует"
      });
    }

    const hashPassword = await hashPassword(password);

    console.log(name, surname, middle_name, login, password, leader);

    const newUser = await db
      .insert({ name, surname, middle_name, login, password: pwdHash, role, leader })
      .into("user_data");
    res.status(200).json({ newUser });
  };

  async authorizeUser(req, res) {
    const { login, password } = req.body;

    const candidate = (
      await db
        .select()
        .from("user_data")
        .where({ login })
    )[0];

    if (!candidate) {
      return res.status(500).json({
        message: "Пользователь c таким логином не зарегистрирован"
      });
    }

    const saltpwd = password + config.staticSalt;

    const match = await argon.verify(candidate.password, saltpwd);

    if (match) {
      const token = await jwt.sign(
        {
          id: candidate.id,
          login,
          role: candidate.role,
        },
        config.jwtsecret,
        {
          expiresIn: "1h",
        }
      );

      return res.status(200).json({ token });
    }
    else {
      return res.status(500).json({
        message: "Неверно введен пароль"
      });
    }
  };

  async editUser(req, res) {
    const { login, password, role } = req.body;

    if (!!login && !validators.login(login)) {
      return res.status(500).json({
        msg: "Неверный логин",
      });
    }
    if (!!password && !validators.password(password)) {
      return res.status(500).json({
        msg: "Неверный пароль",
      });
    }

    const candidate = (
      await db.select().from("userdata").where({ login })
    )[0];

    const [pwdHash] = !!password
      ? await hashPassword(password)
      : [candidate.password];

    const responseData = await db("userdata")
      .where({ id })
      .update({
        login: login || candidate.login,
        password: pwdHash,
        role: role || candidate.role,
      });

    res.status(200).json({
      msg: responseData,
    });
  };

  async deleteUser(req, res) {
    const { login } = req.query;

    const candidate = await db("user_data")
      .where({ login })
      .del();

    res.status(200).json({
      message: candidate,
    });
  };
}

module.exports = new UserController();