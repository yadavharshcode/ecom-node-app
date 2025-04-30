const yup = require('yup');

const create = yup.object({
  body: yup.object({
    name: yup.string().required(),
    description: yup.string().required(),
    price: yup.number().positive().required(),
    stock: yup.number().integer().min(0).required()
  })
});

module.exports = {
  create
};