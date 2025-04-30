const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const validate = require('../middlewares/validation.middleware');
const authValidation = require('../validations/auth.validation');
const authMiddleware = require("../middlewares/auth.middleware")

router.post('/register', validate(authValidation.register), authController.register);
router.post('/login', validate(authValidation.login), authController.login);
router.post('/refresh-token', validate(authValidation.refreshToken), authController.refreshToken);
router.get('/profile',authMiddleware(), authController.getProfile);

module.exports = router;