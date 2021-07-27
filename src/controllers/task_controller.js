const express = require("express");
const db = require('../db');

class TaskController {

  async newTask(req, res) {
    const { login, role } = req.user;
    const {
      heading,
      description,
      expiration_date,
      date_of_creation,
      priority,
      status,
      responsible
    } = req.body;

    try {
      if (role === 'admin') {

        const newTask = await db("tasks")
          .insert({
            heading,
            description,
            expiration_date,
            date_of_creation,
            priority,
            status,
            the_creator: login,
            responsible
          });

        return res.status(200).json({ message: newTask });
      };

      return res.status(500).json({ message: "Недостаточно прав" });
    }
    catch {
      return res.status(500).json({
        message: "Непредвиденная ошибка!"
      });
    }
  };

  async getAllTask(req, res) {
    const { login, role } = req.user;

    if (role === 'admin') {
      const tasksList = (await db('tasks').where({ the_creator: login }).select());
      if (!tasksList[0]) {
        return res.status(200).json({
          message: "Нет задач!"
        });
      }

      return res.status(200).json({ tasksList });
    }

    const tasksList = (await db('tasks').where({ responsible: login }).select());


    if (!tasksList[0]) {
      return res.status(200).json({
        message: "Нет задач!"
      });
    }

    res.status(200).json({ tasksList });
  };

  async getDayTask(req, res) {
    const timestamp = Date.now();
    const tasksList = (await db('tasks')
      .where({ responsible: 'user' })
      .where('expiration_date', '>=', new Date(timestamp).toISOString())
      .where('expiration_date', '<=', new Date(timestamp + 1000 * 60 * 60 * 24 * 4).toISOString())// 7 - это дни
      .select());

    res.status(200).json({ tasksList });
  };

  async getWeekTask(req, res) {

  };

  async getMonthTask(req, res) {

  };

  async getMoreMonthTask(req, res) {

  };

  async editTask(req, res) {
    const { role } = req.user;
    const {
      id,
      heading,
      description,
      expiration_date,
      date_of_creation,
      update_date,
      priority,
      status,
      responsible
    } = req.body;

    const candidate = (await db('user_data').where({ responsible }).select())[0];
    if (!candidate) {
      return res.status(500).json({
        message: "Пользователя с таким логином не существует"
      });
    };
    try {
      if (role === 'admin') {

        const responseData = await db("tasks")
          .where({ id })
          .update({
            heading,
            description,
            expiration_date,
            date_of_creation,
            update_date,
            priority,
            status,
            responsible
          });

        return res.status(200).json({ message: responseData });
      };

      const responseData = await db("tasks")
        .where({ id })
        .update({ update_date });

      return res.status(200).json({ message: responseData });
    }
    catch {
      return res.status(500).json({
        message: "Непредвиденная ошибка!"
      });
    }
  };

  async deleteTask(req, res) { //?????
    const { id } = req.query;

    const candidate = await db("tasks").where("id", "=", id).del();

    res.status(200).json(candidate);
  };
}

module.exports = new TaskController();