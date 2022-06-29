/* eslint-disable import/extensions */
import { Router } from 'express';
import {validateSchema} from '../middlewares/schemaValidator.js';
import { signUpSchema, signInSchema } from  '../schemas/authSchemas.js';
import { signUp, signIn, getUserInfos } from '../controllers/authController.js';
import { tokenValidation } from '../middlewares/authValidator.js';

const authRouter = Router();

authRouter.post('/cadastro', validateSchema(signUpSchema), signUp);
authRouter.post('/login', validateSchema(signInSchema), signIn);
authRouter.get('/get-user', tokenValidation, getUserInfos);

export default authRouter;