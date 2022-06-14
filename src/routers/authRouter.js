/* eslint-disable import/extensions */
import { Router } from 'express';

import { signUpValidator } from '../middlewares/authMiddleware.js';
import { signUp } from '../controllers/authController.js';

const authRouter = Router();

authRouter.post('/cadastro', signUpValidator, signUp);

export default authRouter;