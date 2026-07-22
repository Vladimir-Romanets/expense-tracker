import Joi from 'joi'

export const registerUserSchema = Joi.object({
  firstName: Joi.string().max(50).optional(),
  lastName: Joi.string().max(50).optional(),
  email: Joi.string().email().max(100).required(),
  password: Joi.string().min(8).max(255).required(),
})

export const loginUserSchema = Joi.object({
  email: Joi.string().email().max(100).required(),
  password: Joi.string().min(8).max(255).required(),
})
