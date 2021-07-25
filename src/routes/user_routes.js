const Router = require('express');
const router = new Router();
const userController = require('../controllers/user_controller');

router.post('/register', userController.registerUser);
router.post('/authorize', userController.authorizeUser);
router.patch("/edit", userController.editUser);
router.delete('/user_annihilation', userController.deleteUser);



module.exports = router;