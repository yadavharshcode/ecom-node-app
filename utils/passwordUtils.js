const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash =  await bcrypt.hash(password, salt);
  console.log("hashed>>> ",hash)
  return hash;
};

// hashPassword("password123")

const comparePasswords = async (password, hashedPassword) => {
  console.log("Password>>>> ", password, hashedPassword)
  return bcrypt.compare(password, hashedPassword);
};

module.exports = {
  hashPassword,
  comparePasswords
};