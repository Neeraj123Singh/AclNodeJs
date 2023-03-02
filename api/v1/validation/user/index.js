var Joi = require("joi");

const signUp= Joi.object({
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .required()
      .min(2)
      .max(50),
    name: Joi.string().required(),
    role: Joi.string().required(),
  });

  const login = Joi.object({
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .required()
      .min(2)
      .max(50)
  });
module.exports = {
    signUp,
    login
}