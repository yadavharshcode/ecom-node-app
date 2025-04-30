const Product = require('../models/mysql/product.model');
const { ApiResponse, ApiError } = require('../utils/apiResponse');
const { asyncHandler } = require('../utils/asyncHandler');

const createProduct = asyncHandler(async (req, res) => {
 
  // if(!req.body.name || !req.body.description|| !req.body.price || !req.body.stock){
  //   throw new ApiError(400, 'Bad request, please check all required fields');
  // }
  const product = await Product.create(req.body);
  new ApiResponse(res, 201, { id: product }, 'Product created successfully').send();
});

const getAllProducts = asyncHandler(async (req, res) => {
  console.log("GetProductQuery>>", req.query)
  const { page = 1, limit = 10 } = req.query;
  const result = await Product.findAll({ page, limit });
  new ApiResponse(res, 200, result.data, 'Products retrieved successfully', {
    pagination: result.pagination
  }).send();
});

module.exports = {
  createProduct,
  getAllProducts
};