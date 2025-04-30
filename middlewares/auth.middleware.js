const { verifyToken } = require('../config/jwt');
const { ApiError } = require('../utils/apiResponse');

const authMiddleware = (roles = []) => {
  return (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new ApiError(401, 'Authentication token missing');
      }

      console.log("authHeader>>", authHeader)

      const token = authHeader.split(' ')[1];
      console.log("token>>> ",token)
      const decoded = verifyToken(token);
      console.log("decoded>>> ",decoded)

      if (roles.length && !roles.includes(decoded.role)) {
        throw new ApiError(403, 'Unauthorized access');
      }

      req.user = decoded;
      next();
    } catch (error) {
      next(error);
    }
  };
};

module.exports = authMiddleware;