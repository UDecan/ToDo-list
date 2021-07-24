const Router = require('express');
const router = new Router();
const userRouter = require('./user_routes');
const taskRouter = require('./task_routes');

router.use('/user', userRouter);
router.use('/task', taskRouter);

module.exports = router;