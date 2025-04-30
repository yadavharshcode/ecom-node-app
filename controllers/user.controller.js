const User = require('../models/mysql/user.model');
const { ApiResponse } = require('../utils/apiResponse');
const { asyncHandler } = require('../utils/asyncHandler');

const getAllUsers = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const result = await User.findAll({ page, limit });
  new ApiResponse(res, 200, result.data, 'Users retrieved successfully', {
    pagination: result.pagination
  }).send();
});

module.exports = {
  getAllUsers
};