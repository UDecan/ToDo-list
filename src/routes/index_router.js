const Router = require('express');
const router = new Router();
const userRouter = require('./user_routes');
const taskRouter = require('./task_routes');

// /user/authorize
router.use('/user', userRouter);
router.use('/task', taskRouter);

module.exports = router;