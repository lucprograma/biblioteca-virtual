import Joi from 'joi';

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

export const registerSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  // role: Joi.string().valid('admin', 'regular').required(),
  course: Joi.string().min(2).max(100).required(),
  dni: Joi.number().integer().min(1000000).max(99999999).required()
});

export const patchUserSchema = Joi.object({
  user_id: Joi.number().optional(),
  name: Joi.string().optional(),
  email: Joi.string().email().optional(),
  password: Joi.string().min(6).optional(),
  role: Joi.string().valid('admin', 'regular').optional(),
  course: Joi.string().optional(),
  dni: Joi.number().optional(),
  has_certificate: Joi.boolean().optional()
});

export const activateUserSchema = Joi.object({
  user_id: Joi.number().required()
});
