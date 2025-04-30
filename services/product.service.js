const Product = require('../models/mysql/product.model');

class ProductService {
  static async createProduct(productData) {
    return Product.create(productData);
  }

  static async getAllProducts(page = 1, limit = 10) {
    return Product.findAll({ page, limit });
  }
}

module.exports = ProductService;