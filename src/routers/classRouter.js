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
    approveReservation,
    disapproveReservation,
    deleteReservation,
} from '../controllers/classController.js';
import { classSchema } from '../schemas/classSchemas.js';

const classRouter = Router();

classRouter.post(
    '/agendamento/:roomId',
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
classRouter.put(
    '/reservas/pendentes/:reservaId/aprovar',
    tokenValidation,
    approveReservation
);
classRouter.put(
    '/reservas/pendentes/:reservaId/reprovar',
    tokenValidation,
    disapproveReservation
);
classRouter.delete(
    '/reservas/confirmadas/:reservaId/deletar',
    tokenValidation,
    deleteReservation
);

export default classRouter;
