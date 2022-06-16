/* eslint-disable import/extensions */
import { Router } from 'express';
import {validateSchema} from '../middlewares/schemaValidator.js';
import { signUpSchema } from  '../schemas/authSchemas.js';
import { signUp } from '../controllers/authController.js';

const authRouter = Router();

authRouter.post('/cadastro', validateSchema(signUpSchema), signUp);

export default authRouter;