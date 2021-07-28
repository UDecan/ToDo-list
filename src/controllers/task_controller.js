const express = require("express");
const db = require('../db');

class TaskController {

  async newTask(req, res) {
    const { login, role } = req.user;
    const {
      heading,
      description,
      expiration_date,
      priority,
      responsible
    } = req.body;

    //try {
    if (role === 'admin') {

      const newTask = await db("tasks")
        .insert({
          heading,
          description,
          expiration_date,
          date_of_creation: new Date(Date.now()).toISOString(),
          priority,
          status: 'к выполнению',
          the_creator: login,
          responsible
        });

      return res.status(200).json({ message: newTask });
    };

    return res.status(500).json({ message: "Недостаточно прав" });
    // }
    // catch {
    //   return res.status(500).json({
    //     message: "Непредвиденная ошибка!"
    //   });
    // }
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
    const { login, role } = req.user;
    const timestamp = Date.now();
    const numberOfDays = 1; // промежуток в днях

    if (role === 'admin') {
      const tasksList = (await db('tasks')
        .where({ the_creator: login })
        .where('expiration_date', '>=', new Date(timestamp).toISOString())
        .where('expiration_date', '<=', new Date(timestamp + 1000 * 60 * 60 * 24 * numberOfDays).toISOString())
        .select());
      if (!tasksList[0]) {
        return res.status(200).json({
          message: "Нет задач!"
        });
      }

      return res.status(200).json({ tasksList });
    }

    const tasksList = (await db('tasks')
      .where({ responsible: login })
      .where('expiration_date', '>=', new Date(timestamp).toISOString())
      .where('expiration_date', '<=', new Date(timestamp + 1000 * 60 * 60 * 24 * numberOfDays).toISOString())
      .select());

    if (!tasksList[0]) {
      return res.status(200).json({
        message: "Нет задач!"
      });
    }

    res.status(200).json({ tasksList });
  };

  async getWeekTask(req, res) {
    const { login, role } = req.user;
    const timestamp = Date.now();
    const numberOfDays = 7; // промежуток в днях

    if (role === 'admin') {
      const tasksList = (await db('tasks')
        .where({ the_creator: login })
        .where('expiration_date', '>=', new Date(timestamp).toISOString())
        .where('expiration_date', '<=', new Date(timestamp + 1000 * 60 * 60 * 24 * numberOfDays).toISOString())
        .select());
      if (!tasksList[0]) {
        return res.status(200).json({
          message: "Нет задач!"
        });
      }

      return res.status(200).json({ tasksList });
    }

    const tasksList = (await db('tasks')
      .where({ responsible: login })
      .where('expiration_date', '>=', new Date(timestamp).toISOString())
      .where('expiration_date', '<=', new Date(timestamp + 1000 * 60 * 60 * 24 * numberOfDays).toISOString())
      .select());

    if (!tasksList[0]) {
      return res.status(200).json({
        message: "Нет задач!"
      });
    }

    res.status(200).json({ tasksList });
  };

  async getMoreWeekTask(req, res) {
    const { login, role } = req.user;
    const timestamp = Date.now();
    const numberOfDays = 7; // промежуток в днях

    if (role === 'admin') {
      const tasksList = (await db('tasks')
        .where({ the_creator: login })
        .where('expiration_date', '>=', new Date(timestamp + 1000 * 60 * 60 * 24 * numberOfDays).toISOString())
        .select());
      if (!tasksList[0]) {
        return res.status(200).json({
          message: "Нет задач!"
        });
      }

      return res.status(200).json({ tasksList });
    }

    const tasksList = (await db('tasks')
      .where({ responsible: login })
      .where('expiration_date', '>=', new Date(timestamp + 1000 * 60 * 60 * 24 * numberOfDays).toISOString())
      .select());

    if (!tasksList[0]) {
      return res.status(200).json({
        message: "Нет задач!"
      });
    }

    res.status(200).json({ tasksList });
  };

  async getUpdateDateTask(req, res) {
    const { login, role } = req.user;

    if (role === 'admin') {
      const tasksList = await db('tasks')
        .where({ the_creator: login })
        .orderBy('update_date', 'desc')
        .whereNotNull('update_date')
        .select();
      if (!tasksList[0]) {
        return res.status(200).json({
          message: "Нет задач!"
        });
      }

      return res.status(200).json({ tasksList });
    }

    const tasksList = await db('tasks')
      .orderBy('update_date', 'desc')
      .whereNotNull('update_date')
      .select();

    if (!tasksList[0]) {
      return res.status(200).json({
        message: "Нет задач!"
      });
    }

    res.status(200).json({ tasksList });
  }

  async getResponsibleTask(req, res) {
    const { login, role } = req.user;

    if (role === 'admin') {
      const tasksList = await db('tasks')
        .where({ the_creator: login })
        .orderBy('responsible', 'desc')
        .whereNotNull('responsible')
        .select();
      if (!tasksList[0]) {
        return res.status(200).json({
          message: "Нет задач!"
        });
      }

      return res.status(200).json({ tasksList });
    }

    const tasksList = await db('tasks')
      .orderBy('responsible', 'desc')
      .whereNotNull('responsible')
      .select();

    if (!tasksList[0]) {
      return res.status(200).json({
        message: "Нет задач!"
      });
    }

    res.status(200).json({ tasksList });
  }

  async editTask(req, res) {
    const { role } = req.user;
    const {
      id,
      heading,
      description,
      expiration_date,
      date_of_creation,
      priority,
      status,
      responsible
    } = req.body;

    const candidate = (await db('user_data').where({ login: responsible }).select())[0];
    if (!candidate) {
      return res.status(500).json({
        message: "Пользователя с таким логином не существует"
      });
    };

    // try {
    if (role === 'admin') {

      const responseData = await db("tasks")
        .where({ id })
        .update({
          heading,
          description,
          expiration_date,
          date_of_creation,
          update_date: new Date(Date.now()).toISOString(),
          priority,
          status,
          responsible
        });

      return res.status(200).json({ message: responseData });
    };

    const responseData = await db("tasks")
      .where({ id })
      .update({
        status,
        update_date: new Date(Date.now()).toISOString()
      });

    return res.status(200).json({ message: responseData });
    // }
    // catch {
    //   return res.status(500).json({
    //     message: "Непредвиденная ошибка!"
    //   });
    // }
  };

  async deleteTask(req, res) {
    const { login, role } = req.user;
    const { id } = req.body;

    if (role === 'admin') {
      const tasksList = await db('tasks')
        .where({
          the_creator: login,
          id
        })
        .del();

      res.status(200).json({
        message: tasksList
      });
    };
  }
};


module.exports = new TaskController();