const db = require('../db')

class TaskController{

  async registerTask(req, res) {
    const { name, surname } = req.body;
    console.log(name, surname);
    res.json('ok');
  };

  async getTask(req, res) {
    
  }

  async editTask(req, res) {
    
  };

  async deleteTask(req, res) {
    const { id } = req.query;

    const candidate = await db("tasks").where("id", "=", id).del();

    res.status(200).json(candidate);
  };
}

module.exports = new TaskController();