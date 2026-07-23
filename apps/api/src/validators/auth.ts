import joi from 'joi'

export const registerUserSchema = joi.object({
  firstName: joi.string().max(50).optional(),
  lastName: joi.string().max(50).optional(),
  email: joi.string().email().max(100).required(),
  password: joi.string().min(8).max(255).required(),
})

export const loginUserSchema = joi.object({
  email: joi.string().email().max(100).required(),
  password: joi.string().min(8).max(255).required(),
})
