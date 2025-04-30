const { ApiError } = require('./apiResponse');

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => {
    if (err instanceof ApiError) {
      next(err);
    } else {
      next(new ApiError(500, err.message));
    }
  });
};

module.exports = {asyncHandler};