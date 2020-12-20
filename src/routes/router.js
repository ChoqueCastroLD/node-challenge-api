const Router = require('koa-router');
const router = new Router();

const userControllers = require('../controllers/userController.js');

router.get('/users/getusers', userControllers.getUsers());
router.post('/users/createUsers', userControllers.createUsers());
router.get('/users/getusersById/:userId', userControllers.getUsersById());
router.put('/users/updateUsersById/:userId', userControllers.updateUsersById());
router.delete('/users/deleteUsersById/:userId', userControllers.deleteUsersById());

module.exports = router;