import Joi from 'joi';

export const createUserSchema = Joi.object({
  firstName: Joi.string().max(50).optional(),
  lastName: Joi.string().max(50).optional(),
  email: Joi.string().email().max(100).required(),
  passwordHash: Joi.string().max(255).required(),
});
