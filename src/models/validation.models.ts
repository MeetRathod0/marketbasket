import Joi from 'joi';

export const loginSchema = Joi.object({
	username: Joi.string()
		.required()
		.messages({ 'any.required': 'Username is required' }),
	password: Joi.string()
		.required()
		.messages({ 'any.required': 'Password is required' }),
});

export const registerSchema = Joi.object({
	name: Joi.string()
		.required()
		.messages({ 'any.required': 'Name is required' }),
	email: Joi.string()
		.email({ tlds: { allow: false } })
		.required()
		.messages({ 'any.required': 'Email is required' }),
	phone: Joi.string()
		.min(10)
		.max(10)
		.pattern(new RegExp('^[0-9]+{10}$'))
		.required()
		.messages({ 'any.required': 'Phone is required!' }),
	password: Joi.string()
		.min(6)
		.max(30)
		.pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*]{6,30}$'))
		.required()
		.messages({
			'string.min': 'Password must be at least 6 characters long',
			'string.max': 'Password must be at most 30 characters long',
			'string.pattern.base':
				'Password must contain letters, numbers, and special characters',
			'any.required': 'Password is required',
		}),
	confirmPassword: Joi.string()
		.valid(Joi.ref('newPassword'))
		.required()
		.messages({
			'any.only': 'Confirm password must match the new password',
			'any.required': 'Confirm password is required',
		}),
});

export const passwordChangeSchema = Joi.object({
	// new password
	password: Joi.string()
		.min(6)
		.max(30)
		.pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*]{6,30}$'))
		.required()
		.messages({
			'string.min': 'New password must be at least 6 characters long',
			'string.max': 'New password must be at most 30 characters long',
			'string.pattern.base':
				'New password must contain letters, numbers, and special characters',
			'any.required': 'New password is required',
		}),
});
