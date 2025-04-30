const User = require('../models/mysql/user.model');
const Session = require('../models/cosmos/session.model');
const { generateTokens } = require('../config/jwt');
const { comparePasswords } = require('../utils/passwordUtils');

class AuthService {
  static async registerUser(userData) {
    const existingUser = await User.findByEmail(userData.email);
    if (existingUser) {
      throw new Error('Email already in use');
    }
    return User.create(userData);
  }

  static async loginUser(email, password) {
    const user = await User.findByEmail(email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isMatch = await comparePasswords(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    const tokens = generateTokens({
      userId: user.id,
      email: user.email,
      role: user.role
    });

    await Session.create(user.id, tokens.refreshToken);

    return {
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      },
      tokens
    };
  }
}

module.exports = AuthService;