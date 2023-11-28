const router = require('express').Router();
const httpStatus = require('../constants/generalConstants');

// const authController = require('../controllers/authController');
const { validateUserSchema } = require('../middlewares/validate');
const authController = require('../controllers/authController');
const { isAuthenticated } = require('../middlewares/passport');

router.post('/api/signup', validateUserSchema, authController.signup);

//! user login using passport-local
router.post('/api/login', isAuthenticated, authController.setToken);

router.post('/api/refreshToken', authController.verifyRefreshToken);

module.exports = router;
