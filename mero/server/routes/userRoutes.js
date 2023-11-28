const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const { validateUserSchema } = require('../middlewares/validate');
const { isAdmin, isBuyer } = require('../middlewares/passport');

router
  .route('/api/user')
  .get(isAdmin, userController.getAllUsers)
  .delete(isBuyer, userController.deleteUser)
  .patch(isBuyer, validateUserSchema, userController.updateUser);

router.delete('/api/user/deleteAll', isAdmin, userController.deleteAllUsers);

router.get('/api/user/profile', isBuyer, userController.getUser);

module.exports = router;
