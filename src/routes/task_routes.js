const Router = require('express');
const router = new Router();
const taskController = require('../controllers/task_controller');
const auth = require("../../middleware/authMiddleware");


router.post('/newtask', auth, taskController.newTask);
router.get('/getalltask', auth, taskController.getAllTask);
router.get('/getdaytask', auth, taskController.getDayTask);
router.get('/getweektask', auth, taskController.getWeekTask);
router.get('/getmoremonthtask', auth, taskController.getMoreWeekTask);
router.get('/getupdatedatetask', auth, taskController.getUpdateDateTask);
router.get('/getresponsibletask', auth, taskController.getResponsibleTask);
router.patch('/edittask', auth, taskController.editTask);
router.delete('/task_annihilation', auth, taskController.deleteTask);



module.exports = router;