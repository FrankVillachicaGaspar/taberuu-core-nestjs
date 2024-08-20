import Joi from 'joi';

export const configValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('DEVELOPMENT', 'PRODUCTION')
    .default('DEVELOPMENT'),
  PORT: Joi.number().port().default(3000),
  DATABASE_USER: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
  DATABASE_HOST: Joi.string().required(),
  DATABASE_PORT: Joi.number().port().default(5432),
  DATABASE_NAME: Joi.string().required(),
});

export const validationOptions: Joi.ValidationOptions = {
  abortEarly: true,
};
