import { Router } from 'express';
import { validateSchema } from '../middlewares/schemaValidator.js';
import { tokenValidation } from '../middlewares/authValidator.js';
import {
    scheduleRoom,
    getAvailableRooms,
    getConfirmedReservations,
    getPendingReservations,
    getRoom,
} from '../controllers/classController.js';
import { classSchema } from '../schemas/classSchemas.js';

const classRouter = Router();

classRouter.post(
    '/agendamento',
    [tokenValidation, validateSchema(classSchema)],
    scheduleRoom
);
classRouter.get('/salas/:id', getRoom);
classRouter.get('/salas', getAvailableRooms);
classRouter.get('/reservas/:roomId', tokenValidation, getConfirmedReservations);
classRouter.get(
    '/reservas/pendentes/:roomId',
    tokenValidation,
    getPendingReservations
);

export default classRouter;
