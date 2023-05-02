const yup = require("yup");

const registerUserSchema = yup
  .object({
    email: yup.string().required().email(),
    username: yup.string().required().min(3).max(50),
    password: yup.string().required().min(10),
  })
  .required();

const loginUserSchema = yup
  .object({
    username: yup.string().required().min(3).max(50),
    password: yup.string().required(),
  })
  .required();

module.exports = {
  registerUserSchema,
  loginUserSchema,
};
