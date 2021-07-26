const Router = require('express');
const router = new Router();
const userController = require('../controllers/user_controller');
const auth = require("../../middleware/authMiddleware");


router.post('/register', userController.registerUser);
router.post('/authorize', userController.authorizeUser);
router.post('/getuserinfo', auth, userController.getUserInfo);
router.patch("/edit", auth, userController.editUser);
router.delete('/user_annihilation', auth, userController.deleteUser);



module.exports = router;