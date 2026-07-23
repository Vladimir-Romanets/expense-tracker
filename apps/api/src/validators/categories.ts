import joi from 'joi'

export const createCategoriesSchema = joi.object({
  name: joi.string().max(100).required(),
})
