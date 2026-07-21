import Joi from 'joi';

export const createStoreSchema = Joi.object({
  name: Joi.string().max(100).required(),
});
