const User = require('../models/mysql/user.model');

class UserService {
  static async getAllUsers(page = 1, limit = 10) {
    return User.findAll({ page, limit });
  }
}

module.exports = UserService;