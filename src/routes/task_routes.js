const Router = require('express');
const router = new Router();
const taskController = require('../controllers/task_controller');

router.post('/newtask', taskController.newTask);
router.get('/getalltask', taskController.getTask);
router.get('/getdaytask', taskController.getTask);
router.get('/getweektask', taskController.getTask);
router.get('/getmonthtask', taskController.getTask);
router.get('/getmoremonthtask', taskController.getTask);
router.patch('/edittask', taskController.editTask);
router.delete('/task_annihilation', taskController.deleteTask);



module.exports = router;