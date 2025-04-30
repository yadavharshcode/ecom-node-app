const Order = require('../models/mysql/order.model');

class OrderService {
  static async createOrder(userId, items) {
    return Order.create({ userId, items });
  }
}

module.exports = OrderService;