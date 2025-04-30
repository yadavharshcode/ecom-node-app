const { ApiError } = require('../utils/apiResponse');

const validate = (schema) => async (req, res, next) => {
  try {
    await schema.validate({
      body: req.body,
      query: req.query,
      params: req.params
    }, { abortEarly: false });
    next();
  } catch (error) {
    next(new ApiError(400, 'Validation failed', error.errors));
  }
};

module.exports = validate;