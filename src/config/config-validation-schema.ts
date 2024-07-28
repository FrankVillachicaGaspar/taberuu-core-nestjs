import Joi from 'joi';

export const configValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('DEVELOPMENT', 'PRODUCTION')
    .default('DEVELOPMENT'),
  PORT: Joi.number().port().default(3000),
});

export const validationOptions: Joi.ValidationOptions = {
  abortEarly: true,
};
