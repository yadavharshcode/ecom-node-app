const Order = require('../models/mysql/order.model');
const { ApiResponse } = require('../utils/apiResponse');
const { asyncHandler } = require('../utils/asyncHandler');

const createOrder = asyncHandler(async (req, res) => {
  const orderId = await Order.create({
    userId: req.user.userId,
    items: req.body.items
  });
  new ApiResponse(res, 201, { orderId }, 'Order created successfully').send();
});

module.exports = {
  createOrder
};