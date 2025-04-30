class ApiResponse {
    constructor(res, statusCode, data, message = 'Success') {
      this.res = res;
      this.statusCode = statusCode;
      this.data = data;
      this.message = message;
      this.success = statusCode < 400;
    }
  
    send() {
      this.res.status(this.statusCode).json({
        success: this.success,
        message: this.message,
        data: this.data
      });
    }
  }
  
  class ApiError extends Error {
    constructor(statusCode, message, errors = [], stack = '') {
      super(message);
      this.statusCode = statusCode;
      this.data = null;
      this.message = message;
      this.success = false;
      this.errors = errors;
  
      if (stack) {
        this.stack = stack;
      } else {
        Error.captureStackTrace(this, this.constructor);
      }
    }
  }
  
  module.exports = { ApiResponse, ApiError };