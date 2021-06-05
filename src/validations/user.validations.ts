import Joi from 'joi';

const userValidation = {
  create: {
    body: Joi.object({
      email: Joi.string().max(255).email({ allowUnicode: true }).trim().lowercase().required(),
      password: Joi.string().min(8).max(255).required(),
    }),
  },
  update: {
    params: Joi.object({
      id: Joi.string().required(),
    }),
    body: Joi.object({
      email: Joi.string().max(255).email({ allowUnicode: true }).trim().lowercase().required(),
      password: Joi.string().min(8).max(255).required(),
    }),
  },
  partialUpdate: {
    params: Joi.object({
      id: Joi.string().required(),
    }),
    body: Joi.object({
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
