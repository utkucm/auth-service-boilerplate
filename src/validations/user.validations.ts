import Joi from 'joi';

const userValidation = {
  create: {
    body: Joi.object({
      username: Joi.string().min(4).max(15).trim().required(),
      email: Joi.string().max(255).email({ allowUnicode: true }).trim().lowercase().required(),
      password: Joi.string().min(8).max(255).required(),
      passwordConfirm: Joi.string().valid(Joi.ref('password')).required(),
    }),
  },
  login: {
    body: Joi.object({
      email: Joi.string().max(255).email({ allowUnicode: true }).trim().lowercase().required(),
      password: Joi.string().min(8).max(255).required(),
    }),
  },
  forgotPassword: {
    body: Joi.object({
      email: Joi.string().max(255).email({ allowUnicode: true }).trim().lowercase().required(),
    }),
  },
  update: {
    params: Joi.object({
      id: Joi.string().required(),
    }),
    body: Joi.object({
      username: Joi.string().min(4).max(15).trim(),
      email: Joi.string().max(255).email({ allowUnicode: true }).trim().lowercase(),
      password: Joi.string().min(8).max(255),
    }),
  },
  delete: Joi.object({
    params: {
      id: Joi.string().required(),
    },
  }),
};

export default userValidation;
