const express = require("express");
const db = require('../db')

class TaskController{

  async newTask(req, res) {
    const { name, surname } = req.body;
    res.json('ok');
  };

  async getTask(req, res) {
    const taskList = await db
      .select('*')
      .from('tasks');
    res.status(200).json(taskList);
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