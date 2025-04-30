const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const userController = require('../controllers/user.controller');

router.get('/', authMiddleware(['admin']), userController.getAllUsers);

module.exports = router;