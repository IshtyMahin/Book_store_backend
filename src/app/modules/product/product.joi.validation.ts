import Joi from 'joi';

export const bookValidationSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  price: Joi.number().min(0).required(),
  category: Joi.string()
    .valid('Fiction', 'Science', 'SelfDevelopment', 'Poetry', 'Religious')
    .required(),
  description: Joi.string().required(),
  quantity: Joi.number().min(0).required(),
  inStock: Joi.boolean(),
});
