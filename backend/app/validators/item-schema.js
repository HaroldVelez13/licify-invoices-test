const yup = require("yup");

const itemSchema = yup
  .object({
    tax: yup.number().required(),
    price: yup.number().required().positive(),
    name: yup.string().required(),
  })
  .required();

module.exports = itemSchema;
