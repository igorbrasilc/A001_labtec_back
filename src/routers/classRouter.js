import { Router } from 'express';
import { validateSchema } from '../middlewares/schemaValidator.js';
import { tokenValidation } from '../middlewares/authValidator.js';
import { scheduleRoom } from '../controllers/classController.js';
import { classSchema } from '../schemas/classSchemas.js';

const classRouter = Router();

classRouter.post('/agendamento', [tokenValidation, validateSchema(classSchema)], scheduleRoom);

export default classRouter;