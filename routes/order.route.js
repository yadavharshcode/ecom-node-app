const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const orderController = require('../controllers/order.controller');
const validate = require('../middlewares/validation.middleware');
const orderValidation = require('../validations/order.validation');

router.post('/', authMiddleware(), validate(orderValidation.create), orderController.createOrder);

module.exports = router;