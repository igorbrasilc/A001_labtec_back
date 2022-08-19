import { Router } from 'express';
import { validateSchema } from '../middlewares/schemaValidator.js';
import { tokenValidation } from '../middlewares/authValidator.js';
import {
    scheduleRoom,
    getAvailableRooms,
    getConfirmedReservations,
    getPendingReservations,
    getRoom,
    getAllConfirmedReservations,
    getAllPendingReservations,
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
classRouter.get(
    '/reservas/todas/:userLevel',
    tokenValidation,
    getAllConfirmedReservations
);
classRouter.get(
    '/reservas/pendentes/todas/:userLevel',
    tokenValidation,
    getAllPendingReservations
);

export default classRouter;
