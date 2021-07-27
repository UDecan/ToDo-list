const Router = require('express');
const router = new Router();
const taskController = require('../controllers/task_controller');
const auth = require("../../middleware/authMiddleware");


router.post('/newtask', auth, taskController.newTask);
router.get('/getalltask', auth, taskController.getAllTask);
router.get('/getdaytask', taskController.getDayTask);
router.get('/getweektask', auth, taskController.getWeekTask);
router.get('/getmonthtask', auth, taskController.getMonthTask);
router.get('/getmoremonthtask', auth, taskController.getMoreMonthTask);
router.patch('/edittask', auth, taskController.editTask);
router.delete('/task_annihilation', auth, taskController.deleteTask);



module.exports = router;