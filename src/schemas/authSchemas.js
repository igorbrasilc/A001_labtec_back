import joi from 'joi';

const pattern = "^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$";

export const signUpSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().regex(new RegExp(pattern)).required(),
    confirmPassword: joi.string().valid(joi.ref('password')).required()
});