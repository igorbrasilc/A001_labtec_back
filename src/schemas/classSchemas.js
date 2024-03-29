import joi from 'joi';
import JoiDate from '@joi/date';

const Joi = joi.extend(JoiDate);

export const classSchema = Joi.object({
    description: Joi.string().required(),
    reservationDate: Joi.date().format('DD/MM/YYYY').required(),
    reservationHour: Joi.date().format('HH:mm').required(),
    durationInHours: Joi.date().format('HH:mm').required(),
    numberOfWeeks: joi.any(),
});
