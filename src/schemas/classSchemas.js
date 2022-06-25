import joi from 'joi';

export const classSchema = joi.object({
    description: joi.string().required(),
    reservationDate: joi.date().format('DD/MM/YYYY').required(),
    reservationHour: joi.date().format('HH:mm').required(),
    durationInHours: joi.date().format('HH:mm').required(),
    userId: joi.number().required(),
    roomId: joi.number().required()
});