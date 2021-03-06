const express = require("express");
const db = require('../db');

class TaskController {

  async newTask(req, res) {
    try {
      const { login, role } = req.user;
      const {
        heading,
        description,
        expiration_date,
        priority,
        responsible
      } = req.body;

      if (role === 'admin') {
        const responsibleLogin = (await db('user_data').where({ leader: login, login: responsible }).select())[0];
        if (!responsibleLogin) {
          return res.status(400).json({ message: "Вы не являетесь руководителем этого пользователя" });
        }

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

        return res.status(200).json({ message: "Задача успешно создана" });
      };

      return res.status(400).json({ message: "Недостаточно прав" });
    }
    catch (e) {
      console.error(e.message);
      return res.status(500).json({
        message: e.message
      });
    }
  };

  async getAllTask(req, res) {
    try {
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
    }
    catch (e) {
      console.error(e.message);
      return res.status(500).json({
        message: e.message
      });
    }
  };

  async getDayTask(req, res) {
    try {
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
    }
    catch (e) {
      console.error(e.message);
      return res.status(500).json({
        message: e.message
      });
    }
  };

  async getWeekTask(req, res) {
    try {
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
    }
    catch (e) {
      console.error(e.message);
      return res.status(500).json({
        message: e.message
      });
    }
  };

  async getMoreWeekTask(req, res) {
    try {
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
    }
    catch (e) {
      console.error(e.message);
      return res.status(500).json({
        message: e.message
      });
    }
  };

  async getUpdateDateTask(req, res) {
    try {
      const { login, role } = req.user;

      if (role === 'admin') {
        const tasksList = await db('tasks')
          .where({ the_creator: login })
          .orderBy('update_date', 'desc')
          .select();
        if (!tasksList[0]) {
          return res.status(200).json({
            message: "Нет задач!"
          });
        }

        return res.status(200).json({ tasksList });
      }

      const tasksList = await db('tasks')
        .where({ responsible: login })
        .orderBy('update_date', 'desc')
        .select();

      if (!tasksList[0]) {
        return res.status(200).json({
          message: "Нет задач!"
        });
      }

      res.status(200).json({ tasksList });
    }
    catch (e) {
      console.error(e.message);
      return res.status(500).json({
        message: e.message
      });
    }
  }

  async getResponsibleTask(req, res) {
    try {
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
        .where({ responsible: login })
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
    catch (e) {
      console.error(e.message);
      return res.status(500).json({
        message: e.message
      });
    }
  }

  async editTask(req, res) {
    try {
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
        return res.status(400).json({
          message: "Пользователя с таким логином не существует"
        });
      };


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

        return res.status(200).json({ message: "Задача успешно изменена!" });
      };

      const responseData = await db("tasks")
        .where({ id })
        .update({
          status,
          update_date: new Date(Date.now()).toISOString()
        });

      return res.status(200).json({ message: "Задача успешно изменена!" });
    }
    catch (e) {
      console.error(e.message);
      return res.status(500).json({
        message: e.message
      });
    }
  };
};


module.exports = new TaskController();