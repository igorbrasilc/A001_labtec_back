import { Router } from 'express';

import authRouter from './authRouter.js';
import classRouter from './classRouter.js';

const router = Router();

router.use(authRouter);
router.use(classRouter);

export default router;