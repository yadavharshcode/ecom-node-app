const yup = require('yup');

const register = yup.object({
  body: yup.object({
    username: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
    role: yup.string().oneOf(['customer', 'admin'])
  })
});

const login = yup.object({
  body: yup.object({
    email: yup.string().email().required(),
    password: yup.string().required()
  })
});

const refreshToken = yup.object({
  body: yup.object({
    refreshToken: yup.string().required()
  })
});

module.exports = {
  register,
  login,
  refreshToken
};