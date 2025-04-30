const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const productController = require('../controllers/product.controller');
const validate = require('../middlewares/validation.middleware');
const productValidation = require('../validations/product.validation');

router.post('/', authMiddleware(['admin']), validate(productValidation.create), productController.createProduct);
router.get('/', authMiddleware(),productController.getAllProducts);

module.exports = router;