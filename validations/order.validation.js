const yup = require('yup');

const create = yup.object({
  body: yup.object({
    items: yup.array().of(
      yup.object({
        productId: yup.number().integer().positive().required(),
        quantity: yup.number().integer().min(1).required()
      })
    ).min(1).required()
  })
});

module.exports = {
  create
};