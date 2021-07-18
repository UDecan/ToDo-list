const Router = require('express');
const router = new Router();
const taskController = require('../controllers/task_controller');

router.post('/register', taskController.registerTask);
router.post('/authorize', taskController.getTask);
router.patch('/edit', taskController.editTask);
router.delete('/user_annihilation', taskController.deleteTask);



module.exports = router;