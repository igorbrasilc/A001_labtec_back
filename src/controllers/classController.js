import db from '../database.js';
import classRepository from '../repositories/classRepository.js';

export async function scheduleRoom(req, res) {
    const {description, reservationDate, durationInHours, reservationHour, userId, roomId} = req.body;
    // TODO: TESTAR ESSA QUERY E INSERIR NO CLASSREPOSITORY
    try {
        await db.query(`
        INSERT INTO "pendingRoomReservations"
        (description, "reservationDate", "durationInHours", "reservationHour", "userId", "roomId")
        VALUES
        ($1, $2, $3, $4, $5, $6)
        `, []);
    } catch (e) {
        res.status(500).send(e);
        console.log('Erro ao fazer a reserva', e);
    }
}

export async function getAvailableRooms(req, res) {

    try {
        const availableRooms = await classRepository.getAvailableRooms();

        res.status(200).send(availableRooms.rows)
    } catch (e) {
        res.status(500).send(e);
        console.log('Erro ao fazer a reserva', e);
    }
}