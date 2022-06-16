import joi from 'joi';

export const signUpSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/).required(),
    confirmPassword: joi.string().valid(joi.ref('password')).required()
});

export const signInSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
});