const db = require('../db')

class UserController {

  async registerUser(req, res) {
    const { name, surname, middle_name, login, password, leader } = req.body;
    console.log(name, surname, middle_name, login, password, leader);
    res.json('ok');
  };

  async authorizeUser(req, res) {

  };

  async editUser(req, res) {

  };

  async deleteUser(req, res) {
    const { id } = req.query;

    const candidate = await db("user_data").where("id", "=", id).del();

    res.status(200).json(candidate);
  };
}

module.exports = new UserController();