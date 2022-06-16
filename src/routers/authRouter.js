/* eslint-disable import/extensions */
import { Router } from 'express';
import {validateSchema} from '../middlewares/schemaValidator.js';
import { signUpSchema, signInSchema } from  '../schemas/authSchemas.js';
import { signUp, signIn } from '../controllers/authController.js';

const authRouter = Router();

authRouter.post('/cadastro', validateSchema(signUpSchema), signUp);
authRouter.post('/login', validateSchema(signInSchema), signIn);

export default authRouter;