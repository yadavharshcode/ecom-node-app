const { generateTokens } = require('../config/jwt');
const User = require('../models/mysql/user.model');
const { ApiResponse, ApiError } = require('../utils/apiResponse');
const { asyncHandler } = require('../utils/asyncHandler');
const { comparePasswords, hashPassword } = require('../utils/passwordUtils');

const register = asyncHandler(async (req, res) => {
  const { username, email, password, role } = req.body;
  
  // Check if user already exists
  const existingUser = await User.findByEmail(email);
  if (existingUser) {
    throw new ApiError(400, 'User with this email already exists');
  }

  // Hash password
  const hashedPassword = await hashPassword(password);

  // Create user
  const userId = await User.create({
    username,
    email,
    password: hashedPassword,
    role: role || 'customer'
  });

  // Generate tokens
  const tokens = generateTokens({ userId, email, role: role || 'customer' });

  // Return response
  new ApiResponse(res, 201, {
    userId,
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken
  }, 'User registered successfully').send();
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check if user exists
  const user = await User.findByEmail(email);
  console.log("User>>>> ",user)
  if (!user) {
    throw new ApiError(401, 'Invalid credentials');
  }

  // Verify password
  const isMatch = await comparePasswords(password, user.password);
  console.log("IsMatch>>> ",isMatch)
  if (!isMatch) {
    throw new ApiError(401, 'Invalid credentials');
  }

  // Generate tokens
  const tokens = generateTokens({
    userId: user.id,
    email: user.email,
    role: user.role
  });

  // Return response
  new ApiResponse(res, 200, {
    userId: user.id,
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken
  }, 'Login successful').send();
});

const refreshToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    throw new ApiError(401, 'Refresh token is required');
  }

  // Verify refresh token
  const decoded = verifyToken(refreshToken);

  // Check if user still exists
  const user = await User.findById(decoded.userId);
  if (!user) {
    throw new ApiError(401, 'User not found');
  }

  // Generate new tokens
  const tokens = generateTokens({
    userId: user.id,
    email: user.email,
    role: user.role
  });

  // Return response
  new ApiResponse(res, 200, {
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken
  }, 'Tokens refreshed successfully').send();
});

const getProfile = asyncHandler(async (req, res) => {
  console.log("UserProfile>>> ",req.user)
  const user = await User.findById(req.user.userId);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  new ApiResponse(res, 200, user, 'Profile retrieved successfully').send();
});

module.exports = {
  register,
  login,
  refreshToken,
  getProfile
};